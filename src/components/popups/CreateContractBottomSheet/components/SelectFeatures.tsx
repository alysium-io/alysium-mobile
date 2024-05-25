import { Section, View } from '@atomic';
import { UpdateContractBodyDto } from '@flux/api/contract/dto/update-contract.dto';
import { BottomSheetHeader, RadioListItem } from '@organisms';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';

interface SelectFeaturesProps {
	formMethods: UseFormReturn<UpdateContractBodyDto>;
}

const SelectFeatures: React.FC<SelectFeaturesProps> = ({ formMethods }) => {
	return (
		<View flex={1}>
			<BottomSheetHeader text='Select Features' />
			<ScrollView alwaysBounceVertical={true} style={{ flexGrow: 1 }}>
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
