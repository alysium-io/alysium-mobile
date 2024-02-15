import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SearchStackNavigatorParamList } from '@types'
import { useTabSettings } from '../hooks'
import {
    HostPage,
    ArtistPage,
    SearchPage,
    TagPage,
    SearchPageHeader,
    HostPageHeader,
    ArtistPageHeader,
    TagPageHeader,
    LocationPage,
    LocationPageHeader
} from '@pages'


export const SearchStack = createStackNavigator<SearchStackNavigatorParamList>()

const SearchTab = () => {

    const { screenOptions } = useTabSettings()

    return (
        <SearchStack.Navigator screenOptions={screenOptions}>

            <SearchStack.Screen
                name='SearchPage'
                component={SearchPage}
                options={{ header: SearchPageHeader }}
            />

            <SearchStack.Screen
                name='HostPage'
                component={HostPage}
                options={{ header: HostPageHeader }}
            />

            <SearchStack.Screen
                name='ArtistPage'
                component={ArtistPage}
                options={{ header: ArtistPageHeader }}
            />

            <SearchStack.Screen
                name='TagPage'
                component={TagPage}
                options={{ header: TagPageHeader }}
            />

            <SearchStack.Screen
                name='LocationPage'
                component={LocationPage}
                options={{ header: LocationPageHeader }}
            />

        </SearchStack.Navigator>
    )
}

export default SearchTab