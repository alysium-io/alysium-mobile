import { Section } from '@atomic';
import { DatetimePickerWithModal, MenuListItem } from '@organisms';
import day from 'dayjs';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { useEditContractPageContext } from '../EditContract.context';

type SlotTimeState = {
	startTimeOpen: boolean;
	endTimeOpen: boolean;
};

const SlotTimeSection = () => {
	const { formMethods, onChangeStartTime, onChangeEndTime } =
		useEditContractPageContext();

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
