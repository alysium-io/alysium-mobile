export type RecentSearch = {
    title: string;
    subttile: string;
}

export type SearchState = {
    error: string | null;
    recentSearches: RecentSearch[];
    searchResults: string[];
}