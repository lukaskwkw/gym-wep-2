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