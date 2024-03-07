import authApiSlice from './authApiSlice'
import userApiSlice from './userApiSlice'
import hostApiSlice from './hostApiSlice'
import artistApiSlice from './artistApiSlice'
import tagApiSlice from './tagApiSlice'
import searchApiSlice from './searchApiSlice'
import imagesApiSlice from './imagesApiSlice'

export {
    authApiSlice,
    userApiSlice,
    hostApiSlice,
    artistApiSlice,
    tagApiSlice,
    searchApiSlice,
    imagesApiSlice
}

const apiReducers = {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [hostApiSlice.reducerPath]: hostApiSlice.reducer,
    [artistApiSlice.reducerPath]: artistApiSlice.reducer,
    [tagApiSlice.reducerPath]: tagApiSlice.reducer,
    [searchApiSlice.reducerPath]: searchApiSlice.reducer,
    [imagesApiSlice.reducerPath]: imagesApiSlice.reducer
}

export default apiReducers