import { EditArtistPage } from '@pages';
import { createStackNavigator } from '@react-navigation/stack';
import { EditArtistStackNavigatorParamList } from '@types';
import React from 'react';
import { useTabSettings } from './settings';

export const EditArtistStack =
	createStackNavigator<EditArtistStackNavigatorParamList>();

const EditArtistTab = () => {
	const { screenOptions } = useTabSettings();

	return (
		<EditArtistStack.Navigator screenOptions={screenOptions}>
			<EditArtistStack.Screen
				name='EditArtistPage'
				component={EditArtistPage}
			/>
		</EditArtistStack.Navigator>
	);
};

export default EditArtistTab;
