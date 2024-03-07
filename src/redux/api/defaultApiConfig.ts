import { RootState } from '@redux'
import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'

const intBaseUrl = 'https://api-int.celium.live/celium/api'
const localBaseUrl = 'http://localhost:1337/api'

const config : FetchBaseQueryArgs = {
    baseUrl: localBaseUrl,
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