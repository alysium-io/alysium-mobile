import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SearchStackNavigatorParamList } from '@types'
import {
    Search,
    Artist
} from '@screens'

const Stack = createNativeStackNavigator<SearchStackNavigatorParamList>()

const SearchStackNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SearchPage' component={Search} />
        <Stack.Screen name='ArtistPage' component={Artist} />
    </Stack.Navigator>
)

export default SearchStackNavigator