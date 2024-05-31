import { Section, Text, View } from '@atomic';
import { UpdateContractBodyDto } from '@flux/api/contract/dto/update-contract.dto';
import { TextInputApi } from '@hooks';
import { BottomSheetHeader, EditableDescription } from '@organisms';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface AdditionalNotesProps {
	formMethods: UseFormReturn<UpdateContractBodyDto>;
	additionalNotesTextInputApi: TextInputApi;
}

const AdditionalNotes: React.FC<AdditionalNotesProps> = ({
	formMethods,
	additionalNotesTextInputApi
}) => {
	return (
		<View flex={1}>
			<BottomSheetHeader text='Additional Notes' />
			<Section margin='m' flex={1}>
				<View marginVertical='m'>
					<Text variant='paragraph-small' color='t2'>
						Anything else you want to add to this contract?
					</Text>
				</View>
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
		</View>
	);
};

export default AdditionalNotes;
