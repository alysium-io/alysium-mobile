import { User } from './user'


export type MeResponse = {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
}

export type AuthResponse = {
    jwt: string;
    user: User;
}

export type AuthRequestBody = {
    identifier: string;
    password: string;
}

export type SearchRequestBody = {
    searchText: string;
}

export type SearchResponseItem = {
    score: number;
    id: number;
    spotify_image: string | null;
    spotify_name: string;
}

export type SearchResponse = SearchResponseItem[]

export type ArtistResponse = {
    data: {
        id: number;
        attributes: {
            spotify_image: string;
            spotify_url: string;
            spotify_followers: number;
            spotify_artist_id: string;
            spotify_name: string;
            spotify_popularity: number;
            spotify_genres: string;
            createdAt: null;
            updatedAt: null;
        };
    };
    meta: {};
}

export type ArtistRequestParams = {
    artist_id: number;
}