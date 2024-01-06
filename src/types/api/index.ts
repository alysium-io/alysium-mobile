import { User, Host, Artist } from './models'


/**
 * User
 */
export type UserResponse = User & {
    hosts: Host[]
    artists: Artist[]
}

/**
 * Auth
 */
export type AuthResponse = {
    jwt: string
    user: UserResponse
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

export type CreateHostResponse = {
    data: {
        id: number,
        attributes: {
            name: string,
            createdAt: string,
            updatedAt: string,
            color: string | null,
            image: string | null,
            company_name: string | null,
            phone_number: string | null
        }
    },
    meta: {}
}

export type CreateHostBody = {
    name: string
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

export type CreateArtistResponse = {
    
}

export type CreateArtistBody = {
    name: string
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
