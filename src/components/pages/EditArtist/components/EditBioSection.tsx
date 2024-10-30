import { Section } from '@atomic';
import { EditableDescription } from '@molecules';
import { EditArtistFormApi } from '@src/utils/redux-hook-form/useEditArtistFormApi';
import React from 'react';
import { Controller } from 'react-hook-form';

interface EditBioSectionProps {
	editArtistFormApi: EditArtistFormApi;
	onBlurEditable: () => void;
}

const EditBioSection: React.FC<EditBioSectionProps> = ({
	editArtistFormApi,
	onBlurEditable
}) => {
	return (
		<Section>
			<Controller
				name='bio'
				control={editArtistFormApi.formMethods.control}
				render={({ field: { onChange } }) => (
					<EditableDescription
						multiline
						scrollEnabled={false}
						placeholder='Tell people what you offer as a live artist...'
						onChangeText={onChange}
						onBlur={onBlurEditable}
						defaultValue={
							editArtistFormApi.formMethods.getValues('bio') ?? undefined
						}
					/>
				)}
			/>
		</Section>
	);
};

export default EditBioSection;
