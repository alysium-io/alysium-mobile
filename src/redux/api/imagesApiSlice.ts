import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import defaultApiConfig from './defaultApiConfig'
import {
    UploadImageFormData
} from '@types'


const imagesApiSlice = createApi({
    baseQuery: fetchBaseQuery(defaultApiConfig),
    reducerPath: 'imagesApi',
    tagTypes: ['Images'],
    endpoints: (builder) => ({
        uploadImage: builder.mutation<void, UploadImageFormData>({
            query: (formData) => ({
                url: '/upload',
                method: 'POST',
                body: formData
            })
        })
    })
})

export default imagesApiSlice