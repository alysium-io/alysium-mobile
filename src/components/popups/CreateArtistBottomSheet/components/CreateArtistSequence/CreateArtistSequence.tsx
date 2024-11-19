import { View } from '@atomic';
import { TextInputApi } from '@hooks';
import { CreateArtistFormApi } from '@src/utils/redux-hook-form/useCreateArtistFormApi';
import React from 'react';
import { FadeOut } from 'react-native-reanimated';
import ArtistName from './components/ArtistName';

interface CreateArtistSequenceProps {
	createArtistFormApi: CreateArtistFormApi;
	artistNameTextInputApi: TextInputApi;
}

const CreateArtistSequence: React.FC<CreateArtistSequenceProps> = ({
	createArtistFormApi,
	artistNameTextInputApi
}) => {
	return (
		<View flex={1} animated exiting={FadeOut}>
			<ArtistName
				createArtistFormApi={createArtistFormApi}
				artistNameTextInputApi={artistNameTextInputApi}
			/>
		</View>
	);
};

export default CreateArtistSequence;
