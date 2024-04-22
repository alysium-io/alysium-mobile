import { AppTransitionWrapper, Icon } from '@atomic';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigatorParamList } from '@types';
import React from 'react';
import { useNavigationSettings } from '../hooks';
import { EventManagerTab, ProfileTab, SearchTab } from '../tabs';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const HostApp = () => {
	const { screenOptions, sceneContainerStyle, initialRoutes } =
		useNavigationSettings();

	return (
		<AppTransitionWrapper>
			<NavigationContainer>
				<Tab.Navigator
					initialRouteName={initialRoutes.initialHostAppTab}
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
						name='EventManager'
						component={EventManagerTab}
						options={{
							tabBarIcon: ({ color }) => (
								<Icon name='clipboard' size='regular' color={color} />
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
	);
};

export default HostApp;
