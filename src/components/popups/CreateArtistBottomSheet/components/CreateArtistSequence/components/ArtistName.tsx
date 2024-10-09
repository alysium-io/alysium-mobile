import { DismissKeyboardWrapper, Text, View } from '@atomic';
import { TextInputApi } from '@hooks';
import { TextBox } from '@molecules';
import { CreateArtistFormApi } from '@src/utils/redux-hook-form/useCreateArtistFormApi';
import React from 'react';
import { Controller } from 'react-hook-form';

interface ArtistNameProps {
	createArtistFormApi: CreateArtistFormApi;
	artistNameTextInputApi: TextInputApi;
}

const ArtistName: React.FC<ArtistNameProps> = ({
	createArtistFormApi,
	artistNameTextInputApi
}) => {
	return (
		<DismissKeyboardWrapper>
			<View margin='m'>
				<Text marginBottom='m' marginLeft='s' marginTop='m'>
					Artist Name
				</Text>
				<Controller
					name='name'
					control={createArtistFormApi.formMethods.control}
					rules={{ required: 'Feedback is required' }}
					render={({ field: { onChange, onBlur } }) => (
						<TextBox
							textInputApi={artistNameTextInputApi}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholder='Name'
							subtitle='This field is required.'
						/>
					)}
				/>
			</View>
		</DismissKeyboardWrapper>
	);
};

export default ArtistName;
