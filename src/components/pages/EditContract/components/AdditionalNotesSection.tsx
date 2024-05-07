import { Section } from '@atomic';
import { useTextInput } from '@hooks';
import { SectionHeader } from '@molecules';
import { EditableDescription } from '@organisms';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useEditContractPageContext } from '../EditContract.context';

const AdditionalNotesSection = () => {
	const { formMethods } = useEditContractPageContext();
	const textInput = useTextInput();

	return (
		<Section margin='m'>
			<SectionHeader text='Additional Notes' />
			<Controller
				name='additional_notes'
				control={formMethods.control}
				render={({ field: { onChange, onBlur, value } }) => (
					<EditableDescription
						multiline
						scrollEnabled={false}
						textInputApi={textInput}
						placeholder='Anything else you want to add?...'
						onChangeText={onChange}
						onBlur={onBlur}
						value={value ?? ''}
					/>
				)}
			/>
		</Section>
	);
};

export default AdditionalNotesSection;
