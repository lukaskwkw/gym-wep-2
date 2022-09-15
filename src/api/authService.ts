import { Either, isRight, left, map, right } from "fp-ts/lib/Either";
import { tryCatch } from 'fp-ts/TaskEither'
import { pipe } from "fp-ts/lib/function";
import { EventEmitter } from "stream";
import { TokenHandler } from "../services/TokenHandler";

interface Send<T> {
    send(): Promise<Either<Error, T>>;
}

export type Fun<R> = () => Promise<R>;

export class Request<T> implements Send<T> {
    constructor(private fun: Fun<T>, private tokenHandler: TokenHandler, private eventBus: EventEmitter) {
        // constructor(private fun: <T>() => Promise<Either<Error, T>>, private tokenHandler: TokenHandler, private eventBus: EventEmitter) {
    }

    private request() {
        return pipe(
            this.logoutIfTokenIsExpired(),
            map(() => this.fun())
        );
    }
    
    private logoutIfTokenIsExpired(): Either<Error, void> {
        if (this.tokenHandler.isTokenExpired()) {
            this.eventBus.emit('logout');
            return left(new Error("Token expired"));
        }
        return right(undefined);
    }

    public async send(): Promise<Either<Error, T>> {
        const result = this.request();
        if (isRight(result)) {
            return await tryCatch<Error, T>(
                () => result.right,
                (reason) => new Error(String(reason))
            )();
        } else {
            return left(result.left);
        }
    }
}

export interface AuthService {
    login(): Promise<any>;
    logout(): Promise<any>;
    register(): Promise<any>;
    getUser(): Promise<any>;
}

export const authService = {
    login: async () => { },
    logout: async () => { },
    getUser: async () => { },
    register: async () => { },
}