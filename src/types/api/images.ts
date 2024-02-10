import { Model } from './base'


export type ImageFormats = {
    small: {
        ext: string
        url: string
        hash: string
        mime: string
        name: string
        path: string | null
        size: number
        width: number
        height: number
        isUrlSigned: boolean
    }
    thumbnail: {
        ext: string
        url: string
        hash: string
        mime: string
        name: string
        path: string | null
        size: number
        width: number
        height: number
        isUrlSigned: boolean
    }
}

export type ImageAttributes = {
    id: number
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: ImageFormats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: string | null
    createdAt: string
    updatedAt: string
    isUrlSigned: boolean
}

export type Image = Model<ImageAttributes>