import { Artist, AuthUserResponse, Host, UserDetailsResponse, Event, Venue, ApiIdentifier } from './api'
import { Persona } from './enums'
import { SearchItem } from './search'

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
}

export type PersonaState = {
    isLoading: boolean
    activePersonaType: Persona
    activePersonaId: ApiIdentifier | null
}

export type ArtistState = {
    artist: Artist | null
}

export type HostState = {
    host: Host | null
    events: Event[] | null
    venues: Venue[] | null
}

export type GeneralState = {
    token: string | null
    recentSearches: SearchItem[]
    personaId: ApiIdentifier | null
    personaType: Persona | null
}