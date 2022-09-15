import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { ApiContext, Api } from "../../../api";
import { tokenHandler } from "../../../services/TokenHandler";
import { ShellBody } from "../../ShellBody";
import { authService, Request } from '../../../api/authService';
import { plansApi } from '../../../api/plans';
import { eventBus } from '../../../services/eventBus';

jest.mock('../../../services/TokenHandler');

const apiMock = new Api(eventBus, tokenHandler, authService, plansApi);
describe('Plans', () => {
    it('when received plans length equals 0 then should navigate to createPlan route', async () => {
        tokenHandler.isTokenExpired = jest.fn().mockImplementation(() => false);
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
                    <ShellBody />
                </ApiContext.Provider>
            </MemoryRouter>);
        expect(tokenHandler.isTokenExpired).toBeCalledTimes(1);
        expect(apiMock.plans.getAll).toBeCalledTimes(1);
        expect(await screen.findByAltText('CreatePlan')).toBeInTheDocument();
    });

});
