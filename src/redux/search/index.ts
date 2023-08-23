export { default as searchReducer } from './sliceConfig'

export {
    clearRecentSearch as action_clearRecentSearch,
    setSearchResults as action_setSearchResults,
    addRecentSearch as action_addRecentSearch,
} from './searchSlice'