import React, { useState } from 'react'
import { HeaderSafeArea, View, ScrollView } from '@atomic'
import { BasePage, SearchBar } from '@organisms'
import { useSearchPageContext } from './hooks'
import { SearchPageProvider } from './contexts'
import { SearchInactivePage, SearchActivePage } from './components'


const SearchPage = () => {

    const { setSearchText, clearSearchText } = useSearchPageContext()
    const [isSearching, setIsSearching] = useState<boolean>(false)

    return (
        <BasePage>
            <HeaderSafeArea>
                <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
                    <View margin='m'>
                        <SearchBar
                            onChangeText={setSearchText}
                            onPressClearText={clearSearchText}
                            barDidActivate={() => setIsSearching(true)}
                            barDidDeactivate={() => setIsSearching(false)}
                        />
                    </View>
                    {
                        isSearching ?
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