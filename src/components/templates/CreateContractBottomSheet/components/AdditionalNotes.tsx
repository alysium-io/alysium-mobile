import { Section, View } from '@atomic';
import { useTextInput } from '@hooks';
import { BottomSheetHeader, EditableDescription } from '@organisms';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useCreateContractBottomSheetContext } from '../CreateContractBottomSheet.context';

const AdditionalNotes = () => {
	const { formMethods } = useCreateContractBottomSheetContext();
	const { height: screenHeight } = useWindowDimensions();
	const textInput = useTextInput();
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
								textInputApi={textInput}
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
