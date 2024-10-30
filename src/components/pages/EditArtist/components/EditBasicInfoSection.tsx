import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Section, Text } from '@atomic';
import { Formatting, regexPatterns } from '@etc';
import { FormPhoneNumberTextInputWithLabel } from '@molecules';
import { EditArtistFormApi } from '@src/utils/redux-hook-form/useEditArtistFormApi';
import React from 'react';
import { Controller } from 'react-hook-form';

interface EditBasicInfoSectionProps {
	editArtistFormApi: EditArtistFormApi;
	onBlurEditable: () => void;
}

const EditBasicInfoSection: React.FC<EditBasicInfoSectionProps> = ({
	editArtistFormApi,
	onBlurEditable
}) => {
	const { artistData } = useArtistAppContext();

	return (
		<Section marginTop='xl'>
			<Text variant='section-header-1'>Info</Text>
			<Controller
				name='phone_number'
				control={editArtistFormApi.formMethods.control}
				rules={{
					required: false,
					pattern: {
						value: regexPatterns.phoneNumber,
						message: 'Invalid phone number'
					},
					maxLength: {
						value: 14,
						message: 'Invalid phone number'
					}
				}}
				render={({ field: { onChange } }) => (
					<FormPhoneNumberTextInputWithLabel
						label='phone #'
						placeholder='(123) 456-7890'
						defaultValue={
							artistData.phone_number
								? Formatting.formatPhoneNumber(artistData.phone_number)
								: undefined
						}
						onChangeText={onChange}
						onBlur={onBlurEditable}
					/>
				)}
			/>
		</Section>
	);
};

export default EditBasicInfoSection;
