import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SearchStackNavigator from './SearchStackNavigator'
import ProfileStackNavigator from './ProfileStackNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useSettings } from '@hooks'
import { BottomTabNavigatorParamList } from '@types'
import { Icon } from '@atomic'


const TAB_ICON_SCALING_FACTOR = 0.8

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>()

const TabNavigator = () => {

    const { theme } = useSettings()

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName='Search'
                    screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarInactiveTintColor: theme.colors.secondaryText,
                        tabBarActiveTintColor: theme.colors.primaryText,
                        tabBarStyle: {
                            backgroundColor: theme.colors.primaryBg,
                            borderTopWidth: 0.5,
                            borderTopColor: theme.colors.secondaryBg
                        }
                    }}
                >
                    <Tab.Screen
                        name='Search'
                        component={SearchStackNavigator}
                        options={{
                            tabBarIcon: ({ color, size }) => <Icon name='search' size={size * TAB_ICON_SCALING_FACTOR} color={color} />
                        }}
                    />
                    <Tab.Screen
                        name='Profile'
                        component={ProfileStackNavigator}
                        options={{
                            tabBarIcon: ({ color, size }) => <Icon name='profile' size={size * TAB_ICON_SCALING_FACTOR} color={color} />
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default TabNavigator