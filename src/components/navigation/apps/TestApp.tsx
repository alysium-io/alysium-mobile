import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabNavigatorParamList } from '@types'
import { useNavigationSettings } from '../hooks'
import { AppTransitionWrapper, Icon } from '@atomic'
import {
    ExperimentTab,
    ComponentsTab,
    PagesTab
} from '../tabs'


const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>()

const TestApp = () => {

    const { screenOptions, sceneContainerStyle, initialRoutes } = useNavigationSettings()

    return (
        <AppTransitionWrapper>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName={initialRoutes.initialTestAppTab}
                    sceneContainerStyle={sceneContainerStyle}
                    screenOptions={screenOptions}
                >
                    <Tab.Screen
                        name='Experiment'
                        component={ExperimentTab}
                        options={{
                            tabBarIcon: ({ color }) => <Icon name='experiment' size='regular' color={color} />
                        }}
                    />
                    <Tab.Screen
                        name='Pages'
                        component={PagesTab}
                        options={{
                            tabBarIcon: ({ color }) => <Icon name='mobile' size='regular' color={color} />
                        }}
                    />
                    <Tab.Screen
                        name='Components'
                        component={ComponentsTab}
                        options={{
                            tabBarIcon: ({ color }) => <Icon name='components' size='regular' color={color} />
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </AppTransitionWrapper>
    )
}

export default TestApp