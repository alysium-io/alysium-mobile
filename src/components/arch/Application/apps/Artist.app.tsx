import { AppTransitionWrapper, Icon } from '@atomic';
import { usePersistedAppState, withProvider } from '@hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ArtistAppBottomTabNavigatorParamList } from '@types';
import React from 'react';
import { ArtistAppProvider } from '../contexts/Artist.context';
import { EventManagerTab, ProfileTab, SearchTab } from '../tabs';
import AppDependencies from './AppDependencies';
import { useAppSettings } from './useAppSettings';

export const ArtistTabNavigator =
	createBottomTabNavigator<ArtistAppBottomTabNavigatorParamList>();

const ArtistApp = () => {
	const { screenOptions, fallbackTab } = useAppSettings();
	const { setPersistedAppState, tab } = usePersistedAppState();

	const getInitialRouteName =
		(): keyof ArtistAppBottomTabNavigatorParamList => {
			if (!['Search', 'EditArtist', 'EventManager', 'Profile'].includes(tab)) {
				return fallbackTab;
			} else {
				return tab as keyof ArtistAppBottomTabNavigatorParamList;
			}
		};
	const initialTab = getInitialRouteName();

	return (
		<AppDependencies>
			<AppTransitionWrapper>
				<ArtistTabNavigator.Navigator
					screenOptions={screenOptions}
					initialRouteName={initialTab}
					screenListeners={{
						state: (e) => {
							const currentTab = e.data.state.routes[e.data.state.index].name;
							setPersistedAppState({ tab: currentTab });
						}
					}}
				>
					<ArtistTabNavigator.Screen
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
					<ArtistTabNavigator.Screen
						name='EventManager'
						component={EventManagerTab}
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
					<ArtistTabNavigator.Screen
						name='Profile'
						component={ProfileTab}
						options={{
							tabBarIcon: ({ focused }) => (
								<Icon
									name='user'
									size='m'
									color={
										focused ? 'navbar.icon.active' : 'navbar.icon.inactive'
									}
								/>
							)
						}}
					/>
				</ArtistTabNavigator.Navigator>
			</AppTransitionWrapper>
		</AppDependencies>
	);
};

export default withProvider(ArtistApp, ArtistAppProvider);
