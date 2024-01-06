import { UserResponse } from './api'

export enum Stage {
    precheck = 'precheck',
    loggedOut = 'loggedOut',
    loggedIn = 'loggedIn',
    loading = 'loading',
    error = 'error'
}

export type UserState = {
    stage: Stage
    error: string | null
    user: UserResponse | null
    token: string | null
}