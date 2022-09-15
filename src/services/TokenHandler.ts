export interface TokenHandler {
    getTokenFromStorage(): string | undefined;
    setTokenToStorage(token: string | undefined): void;
    isTokenExpired(): boolean;
}

export const tokenHandler: TokenHandler = {
    getTokenFromStorage: () => undefined,
    setTokenToStorage: (token: string) => { },
    isTokenExpired: () => false,
}