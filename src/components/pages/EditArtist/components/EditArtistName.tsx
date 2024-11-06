import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { TitleTextInput } from '@molecules';
import { EditArtistFormApi } from '@src/utils/redux-hook-form/useEditArtistFormApi';
import React from 'react';
import { Controller } from 'react-hook-form';

interface EditArtistNameProps {
	editArtistFormApi: EditArtistFormApi;
	onBlurEditable: () => void;
}

const EditArtistName: React.FC<EditArtistNameProps> = ({
	editArtistFormApi,
	onBlurEditable
}) => {
	const { artistData } = useArtistAppContext();
	return (
		<View margin='m' marginBottom='none'>
			<Controller
				name='name'
				rules={{ required: true }}
				control={editArtistFormApi.formMethods.control}
				render={({ field: { onChange } }) => (
					<TitleTextInput
						placeholder='Artist name'
						onChangeText={onChange}
						defaultValue={artistData.name}
						onBlur={onBlurEditable}
					/>
				)}
			/>
		</View>
	);
};

export default EditArtistName;
