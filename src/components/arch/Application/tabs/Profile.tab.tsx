import {
	AddArtistTeamMemberPage,
	ArtistEventsInteractiveMapPage,
	ArtistPage,
	ChooseScenePage,
	CreateContactPage,
	CreateExternalLinkPage,
	EditArtistBioPage,
	EditArtistNamePage,
	EditArtistPage,
	EditArtistTeamPage,
	EditContactPage,
	EditContactsPage,
	EditExternalLinkPage,
	EditExternalLinksPage,
	EventPage,
	ProfilePage,
	ScenePage,
	ViewArtistQRCodePage,
	ViewEventMediaPage
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
			<ProfileStack.Screen name='ArtistPage' component={ArtistPage} />
			<ProfileStack.Screen
				name='ArtistEventsInteractiveMapPage'
				component={ArtistEventsInteractiveMapPage}
			/>
			<ProfileStack.Screen name='ScenePage' component={ScenePage} />
			<ProfileStack.Screen name='EventPage' component={EventPage} />
			<ProfileStack.Screen
				name='ViewEventMediaPage'
				component={ViewEventMediaPage}
			/>

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
					options={{
						gestureEnabled: false
					}}
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
					options={{
						gestureEnabled: false
					}}
				/>
			)}

			{personaType === Persona.artist && (
				<ProfileStack.Screen
					name='CreateExternalLinkPage'
					component={CreateExternalLinkPage}
					options={{
						gestureEnabled: false
					}}
				/>
			)}

			{personaType === Persona.artist && (
				<ProfileStack.Screen
					name='EditArtistNamePage'
					component={EditArtistNamePage}
					options={{
						gestureEnabled: false
					}}
				/>
			)}

			{personaType === Persona.artist && (
				<ProfileStack.Screen
					name='EditArtistBioPage'
					component={EditArtistBioPage}
					options={{
						gestureEnabled: false
					}}
				/>
			)}

			{personaType === Persona.artist && (
				<ProfileStack.Screen
					name='EditArtistTeamPage'
					component={EditArtistTeamPage}
				/>
			)}

			{personaType === Persona.artist && (
				<ProfileStack.Screen
					name='AddArtistTeamMemberPage'
					component={AddArtistTeamMemberPage}
				/>
			)}

			{personaType === Persona.artist && (
				<ProfileStack.Screen
					name='ViewArtistQRCodePage'
					component={ViewArtistQRCodePage}
					options={{
						animation: 'fade',
						gestureEnabled: false,
						animationDuration: 300,
						presentation: 'transparentModal',
						contentStyle: {
							backgroundColor: 'transparent'
						}
					}}
				/>
			)}
		</ProfileStack.Navigator>
	);
};

export default ProfileTab;
