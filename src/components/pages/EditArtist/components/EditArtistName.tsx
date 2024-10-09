import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { TitleTextInput } from '@molecules';
import { EditArtistFormApi } from '@src/utils/redux-hook-form/useEditArtistFormApi';
import React from 'react';
import { Controller } from 'react-hook-form';

interface EditArtistNameProps {
	editArtistFormApi: EditArtistFormApi;
}

const EditArtistName: React.FC<EditArtistNameProps> = ({
	editArtistFormApi
}) => {
	const { artistData } = useArtistAppContext();
	return (
		<View>
			<Controller
				name='name'
				rules={{ required: true }}
				control={editArtistFormApi.formMethods.control}
				render={({ field: { onChange, onBlur } }) => (
					<TitleTextInput
						placeholder='Artist name'
						onChangeText={onChange}
						defaultValue={artistData.name}
					/>
				)}
			/>
		</View>
	);
};

export default EditArtistName;
