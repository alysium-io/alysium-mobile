import { Section } from '@atomic';
import { UpdateContractBodyDto } from '@flux/api/contract/dto/update-contract.dto';
import { DatetimePickerWithModal, MenuListItem } from '@organisms';
import day from 'dayjs';
import React, { useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

type SlotTimeState = {
	startTimeOpen: boolean;
	endTimeOpen: boolean;
};

interface SlotTimeSectionProps {
	formMethods: UseFormReturn<UpdateContractBodyDto>;
	onChangeStartTime: (startTime: Date) => void;
	onChangeEndTime: (endTime: Date) => void;
}

const SlotTimeSection: React.FC<SlotTimeSectionProps> = ({
	formMethods,
	onChangeStartTime,
	onChangeEndTime
}) => {
	const [state, setState] = useState<SlotTimeState>({
		startTimeOpen: false,
		endTimeOpen: false
	});

	const toggleOpen = (key: keyof SlotTimeState) =>
		setState({ ...state, [key]: !state[key] });

	return (
		<Section>
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
	);
};

export default SlotTimeSection;
