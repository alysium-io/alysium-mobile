import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Section, Text, View } from '@atomic';
import { Formatting, regexPatterns } from '@etc';
import { useNavigation } from '@hooks';
import { FormPhoneNumber, FormText, MenuListItem } from '@molecules';
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
	const { chooseScenePage } = useNavigation();

	return (
		<Section>
			<View margin='m' marginBottom='none'>
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
						<FormPhoneNumber
							label='Phone'
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
				<Controller
					name='bio'
					control={editArtistFormApi.formMethods.control}
					render={({ field: { onChange } }) => (
						<FormText
							label='Bio'
							placeholder='Tell people what you offer...'
							defaultValue={artistData.bio ?? undefined}
							onChangeText={onChange}
							onBlur={onBlurEditable}
							maxLength={200}
						/>
					)}
				/>
			</View>
			<MenuListItem
				titleTextProps={{
					title: artistData.scene?.scene.name ?? 'City',
					bottomSubtext: artistData.scene?.scene.country ?? 'Join a scene',
					titleVariant: 'paragraph-medium'
				}}
				onPress={chooseScenePage}
			/>
		</Section>
	);
};

export default EditBasicInfoSection;
