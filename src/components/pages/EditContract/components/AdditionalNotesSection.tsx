import { Section } from '@atomic';
import { UpdateContractBodyDto } from '@flux/api/contract/dto/update-contract.dto';
import { TextInputApi } from '@hooks';
import { SectionHeader } from '@molecules';
import { EditableDescription } from '@organisms';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface AdditionalNotesSectionProps {
	formMethods: UseFormReturn<UpdateContractBodyDto>;
	additionalNotesTextInputApi: TextInputApi;
}

const AdditionalNotesSection: React.FC<AdditionalNotesSectionProps> = ({
	formMethods,
	additionalNotesTextInputApi
}) => {
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
						textInputApi={additionalNotesTextInputApi}
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
