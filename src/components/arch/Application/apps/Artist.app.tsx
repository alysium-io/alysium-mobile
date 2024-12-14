import { AppTransitionWrapper, Icon } from '@atomic';
import { usePersistedAppState, withProvider } from '@hooks';
import { ArtistAppBottomTabNavigatorParamList } from '@types';
import React from 'react';
import { ArtistAppProvider } from '../contexts/Artist.context';
import { ProfileTab, SearchTab } from '../tabs';
import EditArtistTab from '../tabs/EditArtist.tab';
import AppDependencies from './AppDependencies';
import { ArtistTabNavigator, FALLBACK_TAB, useAppSettings } from './settings';

const ArtistApp = () => {
	const appTabNavigatorProps = useAppSettings();
	const { setPersistedAppState, tab } = usePersistedAppState();

	const getInitialRouteName =
		(): keyof ArtistAppBottomTabNavigatorParamList => {
			if (!['Search', 'EditArtist', 'Profile'].includes(tab)) {
				return FALLBACK_TAB;
			} else {
				return tab as keyof ArtistAppBottomTabNavigatorParamList;
			}
		};
	const initialTab = getInitialRouteName();

	return (
		<AppDependencies>
			<AppTransitionWrapper>
				<ArtistTabNavigator.Navigator
					{...appTabNavigatorProps}
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
					<ArtistTabNavigator.Screen
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
				</ArtistTabNavigator.Navigator>
			</AppTransitionWrapper>
		</AppDependencies>
	);
};

export default withProvider(ArtistApp, ArtistAppProvider);
