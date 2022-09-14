import { EventEmitter } from "stream";
import { eventBus } from "./eventBus";
import { tokenHandler, TokenHandler } from "./TokenHandler";

export interface AppInitial {
    attachHandleOnTokenExpired(): void;
    removeOnTokenExpiredHandler(): void;
}

// mazna np dodac zeby w inicie przyjmowal dispatch i state moze tez albo w new 

export type Manager = {
    initial: AppInitial;
    tokenHandler: TokenHandler;
    eventBus: EventEmitter;
}

export const AppManager: Manager = {
    eventBus: eventBus,
    initial: {
        attachHandleOnTokenExpired: () => { },
        removeOnTokenExpiredHandler: () => { }
    },
    tokenHandler
};