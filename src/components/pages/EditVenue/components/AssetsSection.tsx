import { Section } from '@atomic';
import { useTextInput } from '@hooks';
import { SectionHeader } from '@molecules';
import { EditableAssetImages, EditableDescription } from '@organisms';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useEditVenuePageContext } from '../EditVenue.context';

const AssetsSection = () => {
	const { formMethods } = useEditVenuePageContext();
	const textInput = useTextInput();

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
						textInputApi={textInput}
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
