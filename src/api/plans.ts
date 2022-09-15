import EventEmitter from 'events';
import { eventBus } from '../services/eventBus';
import { tokenHandler, TokenHandler } from '../services/TokenHandler';
import { Fun, Request } from './authService';

export interface PlansApi {
    get(): Promise<any>;
    update(): Promise<any>;
    delete(): Promise<any>;
    getAll(): Request<string[]>
}

class Plans implements PlansApi {
    constructor(private tokenHandler: TokenHandler, private eventBus: EventEmitter) { };
    get(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    update(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    delete(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    getAll(): Request<string[]> {
        return this.createRequest(() => new Promise<string[]>((resolve) => resolve([])));
    }
    private createRequest<T>(fun: Fun<T>): Request<T> {
        return new Request(
            fun,
            this.tokenHandler,
            this.eventBus);
    }
}
export const plansApi = new Plans(tokenHandler, eventBus);

