import React, { useState, createContext } from 'react'
import { ProviderProps, SearchItem, SearchResponseItem } from '@types'
import { useSearchQuery } from 'src/redux/api/base/baseApiSlice'
import { useNavigation, useSearch } from '@hooks'


export type SearchPageContextType = {
    searchResults: SearchResponseItem[] | undefined
    isLoading: boolean
    error: any
    searchText: string
    setSearchText: React.Dispatch<React.SetStateAction<string>>
    addRecentSearch: (searchText: SearchItem) => void
    deleteRecentSearch: (id: number) => void
    recentSearches: SearchItem[]
    clearSearchText: () => void
    onPressSearchResult: (item: SearchItem) => void
    isInSearchMode: boolean
}

export const SearchPageContext = createContext({} as SearchPageContextType)

export const SearchPageProvider : React.FC<ProviderProps> = ({ children }) => {

    const { artistPage } = useNavigation()
    const [searchText, setSearchText] = useState<string>('')
    const { addRecentSearch, recentSearches, deleteRecentSearch } = useSearch()
    const clearSearchText = () => setSearchText('')
    
    const onPressSearchResult = (item: SearchItem) => {
        addRecentSearch(item)
        artistPage(item.id)
    }

    const {
        data : searchResults,
        isLoading,
        error
    } = useSearchQuery({ searchText })
    
    return (
        <SearchPageContext.Provider
            value={{
                searchText,
                setSearchText,
                searchResults,
                isLoading,
                error,
                addRecentSearch,
                recentSearches,
                deleteRecentSearch,
                clearSearchText,
                onPressSearchResult,
                isInSearchMode: searchText.length > 0
            }}
        >
            {children}
        </SearchPageContext.Provider>
    )
}