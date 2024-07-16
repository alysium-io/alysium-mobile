import { AppTransitionWrapper, Icon } from '@atomic';
import { withProvider } from '@hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigatorParamList } from '@types';
import React from 'react';
import { ArtistAppProvider } from '../contexts/Artist.context';
import { ProfileTab } from '../tabs';
import { useNavigationSettings } from '../tabs/settings';
import AppDependencies from './AppDependencies';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const ArtistApp = () => {
	const { screenOptions, sceneContainerStyle, initialRoutes } =
		useNavigationSettings();

	return (
		<AppDependencies>
			<AppTransitionWrapper>
				<NavigationContainer>
					<Tab.Navigator
						initialRouteName={initialRoutes.initialArtistAppTab}
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
							name='ContractManager'
							component={ContractManagerTab}
							options={{
								tabBarIcon: ({ color }) => (
									<Icon name='contract' size='m' color={color} />
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

export default withProvider(ArtistApp, ArtistAppProvider);
