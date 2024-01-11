import authApiSlice from './authApiSlice'
import userApiSlice from './userApiSlice'
import hostApiSlice from './hostApiSlice'
import artistApiSlice from './artistApiSlice'
import tagApiSlice from './tagApiSlice'
import searchApiSlice from './searchApiSlice'

export {
    authApiSlice,
    userApiSlice,
    hostApiSlice,
    artistApiSlice,
    tagApiSlice,
    searchApiSlice
}

const apiReducers = {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [hostApiSlice.reducerPath]: hostApiSlice.reducer,
    [artistApiSlice.reducerPath]: artistApiSlice.reducer,
    [tagApiSlice.reducerPath]: tagApiSlice.reducer,
    [searchApiSlice.reducerPath]: searchApiSlice.reducer
}

export default apiReducers