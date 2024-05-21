import { Section } from '@atomic';
import { UpdateVenueBodyDto } from '@flux/api/venue/dto/venue-update.dto';
import { TextInputApi } from '@hooks';
import { SectionHeader } from '@molecules';
import { EditableAssetImages, EditableDescription } from '@organisms';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface AssetsSectionProps {
	formMethods: UseFormReturn<UpdateVenueBodyDto>;
	descriptionTextInputApi: TextInputApi;
}

const AssetsSection: React.FC<AssetsSectionProps> = ({
	formMethods,
	descriptionTextInputApi
}) => {
	return (
		<Section>
			<SectionHeader margin='m' text='Assets' />
			<Controller
				name='description'
				control={formMethods.control}
				render={({ field: { onChange, onBlur, value } }) => (
					<EditableDescription
						multiline
						scrollEnabled={false}
						textInputApi={descriptionTextInputApi}
						placeholder='Describe this venue using cool words and stuff...'
						onChangeText={onChange}
						onBlur={onBlur}
						value={value}
					/>
				)}
			/>
			<EditableAssetImages />
		</Section>
	);
};

export default AssetsSection;
