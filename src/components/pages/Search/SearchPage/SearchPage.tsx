import React from 'react'
import { HeaderSafeArea, View, ScrollView } from '@atomic'
import { BasePage, SearchBar } from '@organisms'
import { useSearchPageContext } from './hooks'
import { SearchPageProvider } from './contexts'
import { SearchInactivePage, SearchActivePage } from './components'


const SearchPage = () => {

    const {
        setSearchText,
        clearSearchText,
        isSearchActive,
        setIsSearchActive
    } = useSearchPageContext()

    return (
        <BasePage>
            <HeaderSafeArea>
                <ScrollView alwaysBounceVertical contentContainerStyle={{ minHeight: '100%' }}>
                    <View margin='m'>
                        <SearchBar
                            onChangeText={setSearchText}
                            onPressClearText={clearSearchText}
                            isActive={isSearchActive}
                            setIsActive={setIsSearchActive}
                        />
                    </View>
                    {
                        isSearchActive ?
                            <SearchActivePage key='active' /> :
                            <SearchInactivePage key='inactive' />
                    }
                </ScrollView>
            </HeaderSafeArea>
        </BasePage>
    )
}

export default () => (
    <SearchPageProvider>
        <SearchPage />
    </SearchPageProvider>
)