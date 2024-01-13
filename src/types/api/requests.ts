import { ApiIdentifier, ApiResponseBase, Pagination } from './base'
import { Host, Artist, Tag, Event, EventAttributes } from './models'


/**
 * Auth
 */
export type AuthUserResponse = {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
}

export type LoginResponse = {
    jwt: string
    user: AuthUserResponse
}

export type LoginUserWithIdentifierAndPasswordResponse = {
    jwt: string
    user: AuthUserResponse
}

export type LoginWithIdentifierAndPasswordRequestBody = {
    identifier: string
    password: string
}

export type CreateAccountWithIdentifierAndPasswordResponse = {
    jwt: string
    user: AuthUserResponse
}

export type CreateAccountWithIdentifierAndPasswordRequestBody = {
    username: string
    email: string
    password: string
}

/**
 * Users
 */
export type UserDetailsResponse = {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    hosts: {
        id: number
        name: string | null
        createdAt: string
        updatedAt: string
        color: string | null
        image: string | null
        company_name: string | null
        phone_number: string | null
    }[]
    artists: {
        id: number
        spotify_followers: number | null
        createdAt: string
        updatedAt: string
        spotify_data: null
        image: string | null
        name: string | null
        color: string | null
    }[]
}

/**
 * Search
 */
export type SearchRequestBody = { searchText: string }
export type SearchResponseItem = {
    score: number
    id: number
    image: string
    name: string
}
export type SearchResponse = SearchResponseItem[]

/**
 * Hosts
 */
export type HostDetailsResponse = ApiResponseBase<Host>
export type HostDetailsRequestParams = { hostId: number }

export type CreateHostResponse = ApiResponseBase<Host>
export type CreateHostBody = { name: string }

/**
 * Artists
 */
export type ArtistDetailsResponse = ApiResponseBase<Artist>
export type ArtistDetailsRequestParams = { artistId: number }

export type CreateArtistResponse = {}
export type CreateArtistBody = { name: string }

/**
 * Tags
 */
export type TagResponse = ApiResponseBase<Tag>
export type TagRequestParams = { tagId: number }

// Temporary type
export type TagArtistsResponse = {
    pagination: {
        currentPage: number
        pageSize: number
        totalItems: number
        totalPages: number
    }
    artists: {
        id: number
        spotify_image: string
        spotify_url: string
        spotify_followers: number
        spotify_artist_id: string
        spotify_name: string
        spotify_popularity: number
        spotify_genres: string
        createdAt: string
        updatedAt: string
        spotify_data: {
            spotify_url: string
            spotify_data: null
            spotify_name: string
            spotify_image: string
            spotify_genres: string
            spotify_artist_id: string
            spotify_followers: number
            spotify_popularity: number
        }
    }[]
}

export type TagArtistsRequestParams = { tagId: number }

/**
 * Events
 */
export type CreateEventResponse = ApiResponseBase<Event>
export type CreateEventBody = {
    attributes: Partial<EventAttributes>
}

export type EditEventResponse = ApiResponseBase<Event>
export type EditEventBody = {
    id: ApiIdentifier
    attributes: Partial<EventAttributes>
}

export type EventsResponse = ApiResponseBase<Event[], Pagination>
export type EventsBody = void