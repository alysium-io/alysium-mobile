import { Section, View } from '@atomic';
import { UpdateContractBodyDto } from '@flux/api/contract/dto/update-contract.dto';
import { TextInputApi } from '@hooks';
import { BottomSheetHeader, EditableDescription } from '@organisms';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface AdditionalNotesProps {
	formMethods: UseFormReturn<UpdateContractBodyDto>;
	additionalNotesTextInputApi: TextInputApi;
}

const AdditionalNotes: React.FC<AdditionalNotesProps> = ({
	formMethods,
	additionalNotesTextInputApi
}) => {
	const { height: screenHeight } = useWindowDimensions();
	return (
		<View>
			<BottomSheetHeader text='Additional Notes' />
			<ScrollView
				alwaysBounceVertical={false}
				style={{
					height: screenHeight / 2
				}}
				contentContainerStyle={{
					flexGrow: 1
				}}
			>
				<Section margin='m' justifyContent='center' flex={1}>
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
			</ScrollView>
		</View>
	);
};

export default AdditionalNotes;
