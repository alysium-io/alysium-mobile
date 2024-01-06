import { ModelBase } from './base'

export type User = ModelBase & {
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
}

export type Host = ModelBase & {
    name: string
    color: string | null
    image: string | null
    company_name: string | null
    phone_number: string | null
}

export type Artist = ModelBase & {
    name: string
    image: string | null
    color: string | null
    spotify_followers: number
    spotify_data: {
        name: string
        image: string
        spotify_url: string
        spotify_genres: string | null
        spotify_artist_id: string | null
        spotify_followers: number | null
        spotify_popularity: number | null
    }
}