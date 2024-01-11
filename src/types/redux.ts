import { Artist, AuthUserResponse, Host, UserDetailsResponse, Event } from './api'
import { Persona } from './enums'

export enum AuthStage {
    loggedOut = 'loggedOut',
    loggedIn = 'loggedIn',
    loading = 'loading',
    error = 'error'
}

export type AuthState = {
    stage: AuthStage
    user: AuthUserResponse | null
    token: string | null
}

export type UserState = {
    user: UserDetailsResponse | null
    isLoading: boolean
    error: string | null
}

export type PersonaState = {
    isLoading: boolean
    activePersonaType: Persona
    activePersonaId: number | null
}

export type ArtistState = {
    artist: Artist | null
    error: string | null
    isLoading: boolean
}

export type HostState = {
    host: Host | null
    error: string | null
    isLoading: boolean
    events: Event[]
}