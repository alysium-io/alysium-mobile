import { AppTransitionWrapper, Icon } from '@atomic';
import { Role } from '@flux/api/user/user.entity';
import { usePersistedAppState } from '@hooks';
import { CreateAccountBottomSheet } from '@popups';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserAppBottomTabNavigatorParamList } from '@types';
import React from 'react';
import { useUserAppContext } from '../contexts/User.context';
import { ProfileTab, SearchTab } from '../tabs';
import HomeTab from '../tabs/Home.tab';
import AppDependencies from './AppDependencies';
import { useAppSettings } from './useAppSettings';

export const UserTabNavigator =
	createBottomTabNavigator<UserAppBottomTabNavigatorParamList>();

const UserApp = () => {
	const { screenOptions, fallbackTab } = useAppSettings();
	const { setPersistedAppState, tab } = usePersistedAppState();
	const { userData, createAccountBottomSheetApi } = useUserAppContext();

	const getInitialRouteName = (): keyof UserAppBottomTabNavigatorParamList => {
		if (!['Home', 'Search', 'Profile'].includes(tab)) {
			return fallbackTab;
		} else {
			return tab as keyof UserAppBottomTabNavigatorParamList;
		}
	};
	const initialTab = getInitialRouteName();

	return (
		<AppDependencies>
			<AppTransitionWrapper>
				<UserTabNavigator.Navigator
					screenOptions={screenOptions}
					initialRouteName={initialTab}
					screenListeners={{
						state: (e) => {
							const currentTab = e.data.state.routes[e.data.state.index].name;
							setPersistedAppState({ tab: currentTab });
						}
					}}
				>
					<UserTabNavigator.Screen
						name='Home'
						component={HomeTab}
						options={{
							tabBarIcon: ({ focused }) =>
								focused ? (
									<Icon
										name='home'
										size='m'
										color={
											focused ? 'navbar.icon.active' : 'navbar.icon.inactive'
										}
									/>
								) : (
									<Icon
										name='home'
										size='m'
										color={
											focused ? 'navbar.icon.active' : 'navbar.icon.inactive'
										}
									/>
								)
						}}
					/>
					<UserTabNavigator.Screen
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
					<UserTabNavigator.Screen
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
				</UserTabNavigator.Navigator>
			</AppTransitionWrapper>
			{userData?.role === Role.guest && (
				<CreateAccountBottomSheet sheetApi={createAccountBottomSheetApi} />
			)}
		</AppDependencies>
	);
};

export default UserApp;
