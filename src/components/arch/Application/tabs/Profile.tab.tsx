import {
	ChooseScenePage,
	CreateContactPage,
	CreateExternalLinkPage,
	EditArtistBioPage,
	EditArtistNamePage,
	EditArtistPage,
	EditContactPage,
	EditContactsPage,
	EditExternalLinkPage,
	EditExternalLinksPage,
	ProfilePage
} from '@pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Persona, ProfileStackNavigatorParamList } from '@types';
import React from 'react';
import { useUserAppContext } from '../contexts/User.context';
import { useTabSettings } from './useTabSettings';

export const ProfileStack =
	createNativeStackNavigator<ProfileStackNavigatorParamList>();

const ProfileTab = () => {
	const { screenOptions } = useTabSettings();
	const { personaType } = useUserAppContext();

	return (
		<ProfileStack.Navigator screenOptions={screenOptions}>
			<ProfileStack.Screen name='ProfilePage' component={ProfilePage} />

			{personaType === Persona.artist && (
				<ProfileStack.Screen name='EditArtistPage' component={EditArtistPage} />
			)}

			{personaType === Persona.artist && (
				<ProfileStack.Screen
					name='ChooseScenePage'
					component={ChooseScenePage}
				/>
			)}

			{personaType === Persona.artist && (
				<ProfileStack.Screen
					name='EditContactsPage'
					component={EditContactsPage}
				/>
			)}

			{personaType === Persona.artist && (
				<ProfileStack.Screen
					name='EditContactPage'
					component={EditContactPage}
					options={{
						gestureEnabled: false
					}}
				/>
			)}

			{personaType === Persona.artist && (
				<ProfileStack.Screen
					name='CreateContactPage'
					component={CreateContactPage}
				/>
			)}

			{personaType === Persona.artist && (
				<ProfileStack.Screen
					name='EditExternalLinksPage'
					component={EditExternalLinksPage}
				/>
			)}

			{personaType === Persona.artist && (
				<ProfileStack.Screen
					name='EditExternalLinkPage'
					component={EditExternalLinkPage}
				/>
			)}

			{personaType === Persona.artist && (
				<ProfileStack.Screen
					name='CreateExternalLinkPage'
					component={CreateExternalLinkPage}
				/>
			)}

			{personaType === Persona.artist && (
				<ProfileStack.Screen
					name='EditArtistNamePage'
					component={EditArtistNamePage}
				/>
			)}

			{personaType === Persona.artist && (
				<ProfileStack.Screen
					name='EditArtistBioPage'
					component={EditArtistBioPage}
				/>
			)}
		</ProfileStack.Navigator>
	);
};

export default ProfileTab;
