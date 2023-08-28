import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TestStackNavigatorParamList } from '@types'
import { Test } from '@screens'

const Stack = createNativeStackNavigator<TestStackNavigatorParamList>()

const TestStackNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='TestPage' component={Test} />
    </Stack.Navigator>
)

export default TestStackNavigator