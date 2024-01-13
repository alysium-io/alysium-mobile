import { RootState } from '@redux'
import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'

const config : FetchBaseQueryArgs = {
    baseUrl: 'https://api-int.celium.live/celium/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState
        const token = state.auth.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
}

export default config