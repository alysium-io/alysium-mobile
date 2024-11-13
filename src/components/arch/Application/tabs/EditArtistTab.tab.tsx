import {
	ArtistEventsPage,
	ArtistPage,
	ChooseEventLocationPage,
	ChooseScenePage,
	EditArtistEventPage,
	EditArtistPage,
	ViewGalleryPage
} from '@pages';
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
			<EditArtistStack.Screen
				name='EditArtistEventPage'
				component={EditArtistEventPage}
			/>
			<EditArtistStack.Screen
				name='ChooseScenePage'
				component={ChooseScenePage}
			/>
			<EditArtistStack.Screen name='ArtistPage' component={ArtistPage} />
			<EditArtistStack.Screen
				name='ChooseEventLocationPage'
				component={ChooseEventLocationPage}
			/>

			<EditArtistStack.Screen
				name='ArtistEventsPage'
				component={ArtistEventsPage}
			/>
		</EditArtistStack.Navigator>
	);
};

export default EditArtistTab;
