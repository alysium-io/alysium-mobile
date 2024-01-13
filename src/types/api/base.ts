export type ApiResponseBase<T, M = {}> = {
    data: T
    meta: M
}

export type ApiIdentifier = number

export type BaseAttributes = {
    createdAt: string
    updatedAt: string
}

export type ApiDataObject<T> = {
    id: ApiIdentifier
    attributes: T & BaseAttributes
}

export type Model<T> = ApiDataObject<T>

export type ApiRelation<T> = { data: T }

export type Pagination = {
    pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
    }
}