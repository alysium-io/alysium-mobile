import { AppTransitionWrapper, Icon } from '@atomic';
import { withProvider } from '@hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ArtistAppBottomTabNavigatorParamList } from '@types';
import React from 'react';
import { ArtistAppProvider } from '../contexts/Artist.context';
import { ProfileTab, SearchTab } from '../tabs';
import EditArtistTab from '../tabs/EditArtistTab.tab';
import { artistAppDeepLinkingConfig } from '../tabs/linking';
import { useNavigationSettings } from '../tabs/settings';
import AppDependencies from './AppDependencies';

const Tab = createBottomTabNavigator<ArtistAppBottomTabNavigatorParamList>();

const ArtistApp = () => {
	const { screenOptions, initialRoutes } = useNavigationSettings();

	return (
		<AppDependencies>
			<AppTransitionWrapper>
				<NavigationContainer linking={artistAppDeepLinkingConfig}>
					<Tab.Navigator
						initialRouteName={initialRoutes.initialArtistAppTab}
						screenOptions={screenOptions}
					>
						<Tab.Screen
							name='Search'
							component={SearchTab}
							options={{
								tabBarIcon: ({ focused }) =>
									focused ? (
										<Icon
											name='search-filled'
											size='m'
											color={
												focused ? 'navbar.icon.active' : 'navbar.icon.inactive'
											}
										/>
									) : (
										<Icon
											name='search'
											size='m'
											color={
												focused ? 'navbar.icon.active' : 'navbar.icon.inactive'
											}
										/>
									)
							}}
						/>
						<Tab.Screen
							name='EditArtist'
							component={EditArtistTab}
							options={{
								tabBarIcon: ({ focused }) => (
									<Icon
										name='artist'
										size='m'
										color={
											focused ? 'navbar.icon.active' : 'navbar.icon.inactive'
										}
									/>
								)
							}}
						/>
						<Tab.Screen
							name='Profile'
							component={ProfileTab}
							options={{
								tabBarIcon: ({ focused }) => (
									<Icon
										name='profile'
										size='m'
										color={
											focused ? 'navbar.icon.active' : 'navbar.icon.inactive'
										}
									/>
								)
							}}
						/>
					</Tab.Navigator>
				</NavigationContainer>
			</AppTransitionWrapper>
		</AppDependencies>
	);
};

export default withProvider(ArtistApp, ArtistAppProvider);
