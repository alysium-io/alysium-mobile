import { usePersonaAppContext } from '@arch/Application/contexts/Persona.context';
import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Text, View } from '@atomic';
import { PrivateArtist } from '@flux/api/artist';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useTheme } from '@hooks';
import { BottomSheet } from '@organisms';
import { Persona } from '@types';
import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AccountListItem from './components/AccountListItem';
import CreateAccountListItem from './components/CreateAccountListItem';

interface ChooseAccountBottomSheetProps {
	openCreateArtistSheet: () => void;
	sheetApi: SheetApi;
}

const ChooseAccountBottomSheet: React.FC<ChooseAccountBottomSheetProps> = ({
	sheetApi,
	openCreateArtistSheet
}) => {
	const { theme } = useTheme();
	const insets = useSafeAreaInsets();
	const { changePersona } = usePersonaAppContext();
	const { userData, personaId, personaType, userArtistsData } =
		useUserAppContext();

	const onSelectUserAccount = () => {
		if (personaId === userData.user_uid) return;
		sheetApi.close();
		setTimeout(() => {
			changePersona(Persona.user, userData.user_uid);
		}, 300);
	};

	const onSelectArtistAccount = (artist: PrivateArtist) => {
		if (personaId === artist.artist_uid) return;
		sheetApi.close();
		setTimeout(() => {
			changePersona(Persona.artist, artist.artist_uid);
		}, 300);
	};

	return (
		<BottomSheet ref={sheetApi.sheetRef} maxHeight='20%'>
			<BottomSheetView style={{ flex: 1 }}>
				<View
					borderBottomWidth={theme.borderWidth.normal}
					borderBottomColor='border.light'
					padding='m'
					justifyContent='center'
					alignItems='center'
				>
					<Text variant='paragraph-small-medium' color='text.p'>
						Choose Account
					</Text>
				</View>
				<ScrollView
					contentContainerStyle={{
						marginVertical: theme.spacing.s,
						paddingBottom: insets.bottom,
						gap: theme.spacing.m
					}}
				>
					<CreateAccountListItem
						openCreateArtistSheet={openCreateArtistSheet}
					/>
					<AccountListItem
						name={userData.handle}
						subtitle='Fan'
						image={userData.profile_image?.small.key}
						personaType={Persona.user}
						onPress={onSelectUserAccount}
						isActive={
							personaType === Persona.user && personaId === userData.user_uid
						}
					/>
					{userArtistsData.map((artist) => (
						<AccountListItem
							key={artist.artist_uid}
							name={artist.name}
							subtitle='Artist'
							image={artist.profile_image?.small.key}
							personaType={Persona.artist}
							onPress={() => onSelectArtistAccount(artist)}
							isActive={
								personaType === Persona.artist &&
								personaId === artist.artist_uid
							}
						/>
					))}
				</ScrollView>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default ChooseAccountBottomSheet;
