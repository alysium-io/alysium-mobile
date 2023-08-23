import React from 'react'
import { Profile } from '@screens'
import { ProfileStackNavigatorParamList } from '@types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator<ProfileStackNavigatorParamList>()

const ProfileStackNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='ProfilePage' component={Profile} />
    </Stack.Navigator>
)

export default ProfileStackNavigator