import React from "react";
import { EventEmitter } from "stream";
import { eventBus } from "../services/eventBus";
import { tokenHandler, TokenHandler } from "../services/TokenHandler";
import { AuthService, authService } from "./authService";

export type CombinedApis = {
    authService: AuthService;
}

export class Api {
    constructor(
        private eventBus: EventEmitter,
        private tokenHandler: TokenHandler,
        public authService: AuthService
    ) { }
}
export const api = new Api(eventBus, tokenHandler, authService);
export const ApiContext = React.createContext(api);
