import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { Api, ApiContext } from "../../api";
import { authService, Request } from "../../api/authService";
import App from "../../App";
import { tokenHandler } from "../../services/TokenHandler";
import { plansApi } from '../../api/plans';
import EventEmitter from 'events';
import { Manager } from '../../services/appManager';

// jest.mock('../../services/TokenHandler');

const eventBus = new EventEmitter();
const apiMock = new Api(eventBus, tokenHandler, authService, plansApi);
const appManagerMock: Manager = {
    initial: {
        attachHandleOnTokenExpired: jest.fn().mockReturnValue(undefined),
        removeOnTokenExpiredHandler: jest.fn().mockReturnValue(undefined),
    },
    eventBus,
    tokenHandler
};
describe('ShellBody', () => {
    it('when token isExpired and api call was made then should navigate to login page', async () => {
        tokenHandler.isTokenExpired = jest.fn().mockReturnValueOnce(false).mockReturnValue(true);
        const route = "/plans";
        apiMock.plans.getAll = jest.fn().mockImplementationOnce(() => {
            return new Request(
                () => new Promise<string[]>((resolve) => resolve([])),
                tokenHandler,
                eventBus);
        });
        render(
            <MemoryRouter initialEntries={[route]}>
                <ApiContext.Provider value={apiMock} >
                    <App manager={appManagerMock} />
                </ApiContext.Provider>
            </MemoryRouter>);
        expect(tokenHandler.isTokenExpired).toBeCalledTimes(2);
        expect(apiMock.plans.getAll).toBeCalledTimes(1);
        expect(await screen.findByAltText('Login Page')).toBeInTheDocument();
    });

});
