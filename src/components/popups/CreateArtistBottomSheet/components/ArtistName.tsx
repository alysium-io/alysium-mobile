import { View } from '@atomic';
import { CreateArtistBodyDto } from '@flux/api/artist/dto/artist-create.dto';
import { TextInputApi } from '@hooks';
import { EditableTextInputWithLabel } from '@molecules';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface ArtistNameProps {
	formMethods: UseFormReturn<CreateArtistBodyDto>;
	artistNameTextInputApi: TextInputApi;
}

const HostName: React.FC<ArtistNameProps> = ({
	formMethods,
	artistNameTextInputApi
}) => {
	return (
		<View margin='m'>
			<Controller
				name='name'
				control={formMethods.control}
				rules={{ required: 'Artist name is required' }}
				render={({ field: { value, onChange } }) => (
					<EditableTextInputWithLabel
						label='Artist Name'
						placeholder='Martin Garrix, Julian Jordan, etc.'
						textInputApi={artistNameTextInputApi}
						onChangeText={onChange}
						value={value}
					/>
				)}
			/>
		</View>
	);
};

export default HostName;
