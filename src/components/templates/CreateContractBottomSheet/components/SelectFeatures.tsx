import { Section, View } from '@atomic';
import { BottomSheetHeader, RadioListItem } from '@organisms';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useCreateContractBottomSheetContext } from '../CreateContractBottomSheet.context';

const SelectFeatures = () => {
	const { formMethods } = useCreateContractBottomSheetContext();
	const { height: screenHeight } = useWindowDimensions();

	return (
		<View>
			<BottomSheetHeader text='Select Features' />
			<ScrollView
				alwaysBounceVertical={false}
				style={{
					height: screenHeight / 2
				}}
			>
				<Section margin='m'>
					<Controller
						control={formMethods.control}
						name='host_provides_equipment'
						render={({ field: { value } }) => (
							<RadioListItem
								checked={value}
								onPress={() =>
									formMethods.setValue('host_provides_equipment', !value)
								}
								title='Equipment provided?'
								subtitle={[
									{
										text: 'Add an ',
										variant: 'paragraph-small'
									},
									{
										text: 'Equipment List',
										variant: 'paragraph-small',
										color: 'matt',
										underline: true
									}
								]}
							/>
						)}
					/>
				</Section>
			</ScrollView>
		</View>
	);
};

export default SelectFeatures;
