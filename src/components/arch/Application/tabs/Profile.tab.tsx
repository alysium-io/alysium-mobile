import { ProfilePage, ProfilePageHeader } from '@pages';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileStackNavigatorParamList } from '@types';
import React from 'react';
import { useTabSettings } from './settings';

export const ProfileStack =
	createStackNavigator<ProfileStackNavigatorParamList>();

const ProfileTab = () => {
	const { screenOptions } = useTabSettings();

	return (
		<ProfileStack.Navigator screenOptions={screenOptions}>
			<ProfileStack.Screen
				name='ProfilePage'
				component={ProfilePage}
				options={{ header: ProfilePageHeader }}
			/>
		</ProfileStack.Navigator>
	);
};

export default ProfileTab;
