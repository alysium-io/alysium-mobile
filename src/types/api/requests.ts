import { ApiIdentifier, ApiResponseBase, Pagination } from './base'
import { Host, Artist, Tag, Event, EventAttributes, Venue, VenueAttributes } from './models'


/**
 * Auth
 */
export type AuthUserResponse = {
    id: ApiIdentifier
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
    id: ApiIdentifier
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    hosts: {
        id: ApiIdentifier
        name: string | null
        createdAt: string
        updatedAt: string
        color: string | null
        image: string | null
        company_name: string | null
        phone_number: string | null
    }[]
    artists: {
        id: ApiIdentifier
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
    id: ApiIdentifier
    image: string
    name: string
}
export type SearchResponse = SearchResponseItem[]

/**
 * Hosts
 */
export type HostDetailsResponse = ApiResponseBase<Host>
export type HostDetailsRequestParams = { hostId?: ApiIdentifier }

export type CreateHostResponse = ApiResponseBase<Host>
export type CreateHostBody = { name: string }

/**
 * Artists
 */
export type ArtistDetailsResponse = ApiResponseBase<Artist>
export type ArtistDetailsRequestParams = { artistId: ApiIdentifier }

export type CreateArtistResponse = {}
export type CreateArtistBody = { name: string }

/**
 * Tags
 */
export type TagResponse = ApiResponseBase<Tag>
export type TagRequestParams = { tagId: ApiIdentifier }

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
        spotify_followers: number
        createdAt: string | null
        updatedAt: string | null
        spotify_data: {
            name: string
            image: string | null
            spotify_url: string | null
            spotify_genres: string | null
            spotify_artist_id: string
            spotify_followers: number
            spotify_popularity: number
        },
        image: string | null
        name: string
        color: string
    }[]
}

export type TagArtistsRequestParams = { tagId: ApiIdentifier }

/**
 * Events
 */
export type CreateEventResponse = ApiResponseBase<Event>
export type CreateEventBody = {
    hostId: ApiIdentifier
    attributes: Partial<EventAttributes>
}

export type EditEventResponse = ApiResponseBase<Event>
export type EditEventBody = {
    hostId: ApiIdentifier
    eventId: ApiIdentifier
    attributes: Partial<EventAttributes>
}

export type EventsResponse = ApiResponseBase<Event[], Pagination>
export type EventsBody = void

export type EventDetailsResponse = ApiResponseBase<Event>
export type EventDetailsBody = { eventId: ApiIdentifier }

export type DeleteEventResponse = ApiResponseBase<Event>
export type DeleteEventBody = { eventId: ApiIdentifier }

/**
 * Venues
 */
export type GetMyVenuesResponse = ApiResponseBase<Venue[]>
export type GetMyVenuesBody = { hostId?: ApiIdentifier }

export type CreateVenueResponse = ApiResponseBase<Venue>
export type CreateVenueBody = {
    hostId?: ApiIdentifier
    name: string
}