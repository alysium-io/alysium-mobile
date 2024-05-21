import { Section, Text, View } from '@atomic';
import { UpdateContractBodyDto } from '@flux/api/contract/dto/update-contract.dto';
import {
	BottomSheetHeader,
	DatetimePickerWithModal,
	MenuListItem
} from '@organisms';
import day from 'dayjs';
import React, { useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

type SlotTimeState = {
	startTimeOpen: boolean;
	endTimeOpen: boolean;
};

interface SelectSlotTimeProps {
	formMethods: UseFormReturn<UpdateContractBodyDto>;
	onChangeStartTime: (date: Date) => void;
	onChangeEndTime: (date: Date) => void;
}

const SelectSlotTime: React.FC<SelectSlotTimeProps> = ({
	formMethods,
	onChangeStartTime,
	onChangeEndTime
}) => {
	const { height: screenHeight } = useWindowDimensions();

	const [state, setState] = useState<SlotTimeState>({
		startTimeOpen: false,
		endTimeOpen: false
	});

	const toggleOpen = (key: keyof SlotTimeState) =>
		setState({ ...state, [key]: !state[key] });

	return (
		<View>
			<BottomSheetHeader text='Slot Time' />
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
					<Text variant='paragraph-small' marginHorizontal='m' color='t3'>
						When is the artist playing?
					</Text>
					<Controller
						name='start_time'
						control={formMethods.control}
						render={({ field: { value } }) => (
							<MenuListItem
								title='Start Time'
								secondaryText={
									value ? day(value).format('MMM D, h:mma') : 'No Date Selected'
								}
								onPress={() => toggleOpen('startTimeOpen')}
								color='ion'
							/>
						)}
					/>
					<Controller
						name='end_time'
						control={formMethods.control}
						render={({ field: { value } }) => (
							<MenuListItem
								title='End Time'
								secondaryText={
									value ? day(value).format('MMM D, h:mma') : 'No Date Selected'
								}
								onPress={() => toggleOpen('endTimeOpen')}
								color='ion'
								border={false}
							/>
						)}
					/>
					<DatetimePickerWithModal
						title='Event Start'
						isOpen={state.startTimeOpen}
						toggleModal={() => toggleOpen('startTimeOpen')}
						onConfirm={onChangeStartTime}
						onCancelled={() => console.log('Cancelled')}
					/>
					<DatetimePickerWithModal
						title='Event End'
						isOpen={state.endTimeOpen}
						toggleModal={() => toggleOpen('endTimeOpen')}
						onConfirm={onChangeEndTime}
						onCancelled={() => console.log('Cancelled')}
					/>
				</Section>
			</ScrollView>
		</View>
	);
};

export default SelectSlotTime;
