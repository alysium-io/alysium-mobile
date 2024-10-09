import { usePersonaAppContext } from '@arch/Application/contexts/Persona.context';
import { Avatar, Text, View } from '@atomic';
import { SheetApi } from '@hooks';
import { Button } from '@molecules';
import { CreateArtistFormApi } from '@src/utils/redux-hook-form/useCreateArtistFormApi';
import { Persona } from '@types';
import React from 'react';
import { FadeIn } from 'react-native-reanimated';

interface CreateArtistSuccessProps {
	sheetApi: SheetApi;
	createArtistFormApi: CreateArtistFormApi;
}

const CreateArtistSuccess: React.FC<CreateArtistSuccessProps> = ({
	sheetApi,
	createArtistFormApi
}) => {
	const { changePersona } = usePersonaAppContext();

	const continueAsArtist = () => {
		sheetApi.close();
		setTimeout(() => {
			if (createArtistFormApi.data) {
				changePersona(Persona.artist, createArtistFormApi.data.artist_uid);
			}
		}, 200);
	};

	return (
		<View
			animated
			entering={FadeIn}
			flex={1}
			padding='m'
			alignItems='center'
			justifyContent='center'
		>
			<View margin='m' alignItems='center'>
				<View height={90} width={90} marginBottom='l'>
					<Avatar image={createArtistFormApi.data?.profile_image?.small?.key} />
				</View>
				<Text variant='page-header' marginBottom='l' textAlign='center'>
					Welcome {createArtistFormApi.data?.name}!
				</Text>
				<Text
					variant='paragraph-small-light'
					textAlign='center'
					marginBottom='l'
				>
					You are now an artist on{' '}
					<Text variant='paragraph-small-medium'>Alysium</Text>!
				</Text>
			</View>
			<View width='100%'>
				<View marginBottom='m'>
					<Button
						text='Continue as user'
						onPress={sheetApi.close}
						variant='outlined'
					/>
				</View>
				<Button text='Switch to Artist' onPress={continueAsArtist} color='p' />
			</View>
		</View>
	);
};

export default CreateArtistSuccess;
