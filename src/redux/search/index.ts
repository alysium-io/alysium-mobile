export { default as searchReducer } from './sliceConfig'

export {
    clearRecentSearches as action_clearRecentSearches,
    setSearchResults as action_setSearchResults,
    addRecentSearch as action_addRecentSearch,
    deleteRecentSearch as action_deleteRecentSearch,
    setSearchText as action_setSearchText,
    clearSearchText as action_clearSearchText,
    setIsSearchActive as action_setIsSearchActive
} from './searchSlice'