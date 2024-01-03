import { User } from './user'


/**
 * User
 */
export type MeResponse = {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
}

/**
 * Auth
 */
export type AuthResponse = {
    jwt: string
    user: User
}

export type AuthRequestBody = {
    identifier: string
    password: string
}

export type CreateAccountResponse = AuthResponse
export type CreateAccountBody = {
    username: string
    email: string
    password: string
}

/**
 * Search
 */
export type SearchRequestBody = {
    searchText: string
}

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
export type HostResponse = {
    name: string
    image: string
    about: string
    relatedVenues: {
        itemId: number,
        image: string,
        title: string,
        subtitle: string
    }[]
    images: string[]
    links: {
        title: string
        url: string
    }[]
    pinnedEvents: {
        id: number,
        name: string,
        image: string,
        ticketsSold: number
    }[]
    upcomingEvents: {
        id: number,
        name: string,
        image: string,
        date: string
    }[]
}

export type HostRequestParams = {
    hostId: number
}

/**
 * Artists
 */
export type ArtistResponse = {
    name: string
    image: string
    about: string
    links: {
        title: string
        url: string
    }[]
    images: string[]
    pinnedEvents: {
        id: number
        name: string
        image: string
        ticketsSold: number
    }[]
    upcomingEvents: {
        id: number
        name: string
        image: string
        date: string
    }[]
    relatedArtists: {
        itemId: number
        image: string
        title: string
        subtitle: string
    }[]
}

export type ArtistRequestParams = {
    artistId: number
}


/**
 * Tags
 */
export type TagResponse = {
    data: {
        id: number
        attributes: {
            name: string
            color: string
            createdAt: string
            updatedAt: string
        }
    }
    meta: {}
}

export type TagRequestParams = {
    tagId: number
}

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

export type TagArtistsRequestParams = {
    tagId: number
}
