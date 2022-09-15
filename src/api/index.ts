import { log } from "console";
import React from "react";
import { EventEmitter } from "stream";
import { eventBus } from "../services/eventBus";
import { tokenHandler, TokenHandler } from "../services/TokenHandler";
import { AuthService, authService } from "./authService";
import { plansApi, PlansApi } from "./plans";

export type CombinedApis = {
    authService: AuthService;
}

export class Api {
    constructor(
        private eventBus: EventEmitter,
        private tokenHandler: TokenHandler,
        public authService: AuthService,
        public plans: PlansApi
    ) {
    }
}
export const api = new Api(eventBus, tokenHandler, authService, plansApi);
export const ApiContext = React.createContext(api);
