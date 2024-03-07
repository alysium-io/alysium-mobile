import { ApiRelation, Model } from './base'
import { Image } from './images'

export type UserAttributes = {
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
}
export type User = Model<UserAttributes>

export type HostAttributes = {
    name: string
    color: string | null
    image: string | null
    company_name: string | null
    phone_number: string | null
    location: ApiRelation<Location>
    venues: ApiRelation<Venue[]>
}
export type Host = Model<HostAttributes>

export type ArtistAttributes = {
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
export type Artist = Model<ArtistAttributes>

/**
 * Events
 */
export type EditEventAttributes = {
    name: string,
    venue?: number | null
    start_time?: string | null
    end_time?: string | null
    doors_open_time?: string | null
}
export type EventAttributes = {
    name: string
    date: string | null
    start_time: string | null
    end_time: string | null
    doors_open_time: string | null
    address: string | null
    color: string | null
    slots?: ApiRelation<Slot[]>
    venue?: ApiRelation<Venue | null>
    image?: ApiRelation<Image | null>
}
export type Event = Model<EventAttributes>

/**
 * Venues
 */
export type EditVenueAttributes = {
    name: string
    address: string
    phone_number: string
    capacity: string
}
export type VenueAttributes = {
    name: string
    capacity: string | null
    address: string | null
    website: string | null
    phone_number: string | null
    is_ready_for_contracting: boolean | null
    location_lat_lon: string | null
    image?: ApiRelation<Image | null>
}
export type Venue = Model<VenueAttributes>

/**
 * Slots
 */
export type SlotAttributes = {
    start: string
    end: string
}
export type Slot = Model<SlotAttributes>

/**
 * Location
 */
export type LocationAttributes = {}
export type Location = Model<LocationAttributes>

/**
 * Tags
 */
export type TagAttributes = {
    name: string
    color: string
}
export type Tag = Model<TagAttributes>