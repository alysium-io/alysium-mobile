import { AppTransitionWrapper, Icon } from '@atomic';
import { withProvider } from '@hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigatorParamList } from '@types';
import React from 'react';
import { HostAppProvider } from '../contexts/Host.context';
import { ProfileTab } from '../tabs';
import { useNavigationSettings } from '../tabs/settings';
import AppDependencies from './AppDependencies';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const HostApp = () => {
	const { screenOptions, sceneContainerStyle, initialRoutes } =
		useNavigationSettings();

	return (
		<AppDependencies>
			<AppTransitionWrapper>
				<NavigationContainer>
					<Tab.Navigator
						initialRouteName={initialRoutes.initialHostAppTab}
						sceneContainerStyle={sceneContainerStyle}
						screenOptions={screenOptions}
					>
						{/* <Tab.Screen
							name='Search'
							component={SearchTab}
							options={{
								tabBarIcon: ({ color, focused }) =>
									focused ? (
										<Icon name='search-filled' size='m' color={color} />
									) : (
										<Icon name='search' size='m' color={color} />
									)
							}}
						/>
						<Tab.Screen
							name='EventManager'
							component={EventManagerTab}
							options={{
								tabBarIcon: ({ color }) => (
									<Icon name='clipboard' size='m' color={color} />
								)
							}}
						/> */}
						<Tab.Screen
							name='Profile'
							component={ProfileTab}
							options={{
								tabBarIcon: ({ color }) => <Icon name='profile' size='m' />
							}}
						/>
					</Tab.Navigator>
				</NavigationContainer>
			</AppTransitionWrapper>
		</AppDependencies>
	);
};

export default withProvider(HostApp, HostAppProvider);
