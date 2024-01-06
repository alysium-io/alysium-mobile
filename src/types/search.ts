export type SearchItem = {
    id: number
    score: number
    name: string
    image: string
}

export type SearchState = {
    error: string | null
    recentSearches: SearchItem[]
    searchResults: SearchItem[]
    searchText: string
    isSearchActive: boolean
}