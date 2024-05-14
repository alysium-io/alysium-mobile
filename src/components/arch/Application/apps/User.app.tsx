import { AppTransitionWrapper, Icon } from '@atomic';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigatorParamList } from '@types';
import React from 'react';
import { ProfileTab, SearchTab } from '../tabs';
import { useNavigationSettings } from '../tabs/settings';
import AppDependencies from './AppDependencies';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const UserApp = () => {
	const { screenOptions, sceneContainerStyle, initialRoutes } =
		useNavigationSettings();

	return (
		<AppDependencies>
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
								tabBarIcon: ({ color, focused }) =>
									focused ? (
										<Icon name='search-filled' size='regular' color={color} />
									) : (
										<Icon name='search' size='regular' color={color} />
									)
							}}
						/>
						<Tab.Screen
							name='Profile'
							component={ProfileTab}
							options={{
								tabBarIcon: ({ color }) => (
									<Icon name='profile' size='regular' color={color} />
								)
							}}
						/>
					</Tab.Navigator>
				</NavigationContainer>
			</AppTransitionWrapper>
		</AppDependencies>
	);
};

export default UserApp;
