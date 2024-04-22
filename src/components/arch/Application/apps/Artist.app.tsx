import { AppTransitionWrapper, Icon } from '@atomic';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigatorParamList } from '@types';
import React from 'react';
import { useNavigationSettings } from '../hooks';
import { ContractManagerTab, ProfileTab, SearchTab } from '../tabs';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const ArtistApp = () => {
	const { screenOptions, sceneContainerStyle, initialRoutes } =
		useNavigationSettings();

	return (
		<AppTransitionWrapper>
			<NavigationContainer>
				<Tab.Navigator
					initialRouteName={initialRoutes.initialArtistAppTab}
					sceneContainerStyle={sceneContainerStyle}
					screenOptions={screenOptions}
				>
					<Tab.Screen
						name='Search'
						component={SearchTab}
						options={{
							tabBarIcon: ({ color }) => (
								<Icon name='search' size='regular' color={color} />
							)
						}}
					/>
					<Tab.Screen
						name='ContractManager'
						component={ContractManagerTab}
						options={{
							tabBarIcon: ({ color }) => (
								<Icon name='contract' size='regular' color={color} />
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

export default ArtistApp;
