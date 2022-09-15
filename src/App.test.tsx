import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { AppInitial, Manager } from './services/appManager';
import EventEmitter from 'events';
import { Api, ApiContext } from './api';
import { authService } from './api/authService';
import { tokenHandler } from './services/TokenHandler';
import { plansApi } from './api/plans';

jest.mock('./services/TokenHandler');
const eventBus = new EventEmitter();
const appManagerMock: Manager = {
  initial: {
    attachHandleOnTokenExpired: jest.fn().mockReturnValue(undefined),
    removeOnTokenExpiredHandler: jest.fn().mockReturnValue(undefined),
  },
  eventBus,
  tokenHandler
};

const apiMock = new Api(eventBus, tokenHandler, authService, plansApi);
describe('App', () => {
  it('should render a navigation and default route should be home when token is not expired', () => {
    tokenHandler.isTokenExpired = jest.fn().mockImplementation(() => false);
    render(<App manager={appManagerMock} />, { wrapper: BrowserRouter })
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByAltText('Home Page')).toBeInTheDocument();
  });

  test('should navigate to login page when token is expired', async () => {
    const spy = jest.spyOn(eventBus, 'on');
    const emitSpy = jest.spyOn(eventBus, 'emit');

    tokenHandler.isTokenExpired = jest.fn().mockImplementation(() => true);
    render(
      <ApiContext.Provider value={apiMock} >
        <App manager={appManagerMock} />
      </ApiContext.Provider>
      , { wrapper: BrowserRouter });

    expect(spy).toBeCalledTimes(1);
    expect(tokenHandler.isTokenExpired).toBeCalledTimes(1);
    expect(emitSpy).toBeCalledTimes(1);
    expect(await screen.getByAltText('Login Page')).toBeInTheDocument();
  });
});
