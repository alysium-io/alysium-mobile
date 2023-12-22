import { SearchItem } from '@types'
import { useDispatch, useSelector } from 'src/redux'
import {
    action_addRecentSearch,
    action_clearRecentSearches,
    action_deleteRecentSearch,
    action_setSearchText,
    action_clearSearchText,
    action_setIsSearchActive
} from 'src/redux/search'


interface IUseSearch {
    addRecentSearch: (search: SearchItem) => void
    clearRecentSearches: () => void
    deleteRecentSearch: (id: number) => void
    setSearchText: (searchText: string) => void
    clearSearchText: () => void
    setIsSearchActive: (isSearchActive: boolean) => void
    recentSearches: SearchItem[]
    searchText: string
}

const useSearch = () : IUseSearch => {

    const search = useSelector(state => state.search)
    const dispatch = useDispatch()

    const setSearchText = (searchText: string) => {
        dispatch(action_setSearchText(searchText))
    }

    const clearSearchText = () => {
        dispatch(action_clearSearchText())
    }

    const addRecentSearch = (search: SearchItem) => {
        dispatch(action_addRecentSearch(search))
    }

    const clearRecentSearches = () => {
        dispatch(action_clearRecentSearches())
    }

    const deleteRecentSearch = (id: number) => {
        dispatch(action_deleteRecentSearch(id))
    }

    const setIsSearchActive = (isSearchActive: boolean) => {
        dispatch(action_setIsSearchActive(isSearchActive))
    }
    
    return {
        addRecentSearch,
        clearRecentSearches,
        deleteRecentSearch,
        setSearchText,
        clearSearchText,
        setIsSearchActive,
        recentSearches: search.recentSearches,
        searchText: search.searchText
    }
}

export default useSearch