import React from 'react'
import { Text, View } from '@atomic'
import NoRecentSearches from './NoRecentSearches'
import { FadeInUp, FadeOutDown } from 'react-native-reanimated'


const SearchActivePage = () => {

    return (
        <View
            animated
            entering={FadeInUp.duration(250)}
            exiting={FadeOutDown.duration(250)}
            margin='m'
        >
            <NoRecentSearches />
        </View>
    )
}

export default SearchActivePage