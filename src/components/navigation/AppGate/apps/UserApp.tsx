import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabNavigatorParamList } from '@types'
import { useNavigationSettings } from '../hooks'
import { AppTransitionWrapper, Icon } from '@atomic'
import {
    SearchTab,
    ProfileTab
} from '../tabs'


const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>()

const UserApp = () => {

    const { screenOptions, sceneContainerStyle, initialRoutes } = useNavigationSettings()

    return (
        <AppTransitionWrapper>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName={initialRoutes.initialUserAppTab}
                    sceneContainerStyle={sceneContainerStyle}
                    screenOptions={screenOptions}
                >
                    <Tab.Screen
                        name='Search'
                        component={SearchTab}
                        options={{
                            tabBarIcon: ({ color }) => <Icon name='search' size='regular' color={color} />
                        }}
                    />
                    <Tab.Screen
                        name='Profile'
                        component={ProfileTab}
                        options={{
                            tabBarIcon: ({ color }) => <Icon name='profile' size='regular' color={color} />
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </AppTransitionWrapper>
    )
}

export default UserApp