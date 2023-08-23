export enum Stage {
    precheck = 'precheck',
    loggedOut = 'loggedOut',
    loggedIn = 'loggedIn',
    loading = 'loading',
    error = 'error'
}

export type User = {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
}

export type UserState = {
    stage: Stage;
    error: string | null;
    user: User | null;
    token: string | null;
}