import { EditArtistPage, ViewGalleryPage } from '@pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditArtistStackNavigatorParamList } from '@types';
import React from 'react';
import { useTabSettings } from './settings';

export const EditArtistStack =
	createNativeStackNavigator<EditArtistStackNavigatorParamList>();

const EditArtistTab = () => {
	const { screenOptions } = useTabSettings();

	return (
		<EditArtistStack.Navigator screenOptions={screenOptions}>
			<EditArtistStack.Screen
				name='EditArtistPage'
				component={EditArtistPage}
			/>
			<EditArtistStack.Screen
				name='ViewGalleryPage'
				component={ViewGalleryPage}
				options={{
					presentation: 'transparentModal',
					animation: 'fade'
				}}
			/>
		</EditArtistStack.Navigator>
	);
};

export default EditArtistTab;
