import { Section, View } from '@atomic';
import { UpdateEventBodyDto } from '@flux/api/event/dto/event-update.dto';
import { SectionHeader } from '@molecules';
import { DatetimePickerWithModal, MenuListItem } from '@organisms';
import day from 'dayjs';
import React, { useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

type EventDateState = {
	startTimeOpen: boolean;
	doorsOpenTimeOpen: boolean;
	endTimeOpen: boolean;
};

interface EventDateSectionProps {
	formMethods: UseFormReturn<UpdateEventBodyDto>;
	onChangeStartTime: (startTime: Date) => void;
	onChangeDoorsOpenTime: (doorsOpenTime: Date) => void;
	onChangeEndTime: (endTime: Date) => void;
}

const EventDateSection: React.FC<EventDateSectionProps> = ({
	formMethods,
	onChangeStartTime,
	onChangeDoorsOpenTime,
	onChangeEndTime
}) => {
	const [state, setState] = useState<EventDateState>({
		startTimeOpen: false,
		doorsOpenTimeOpen: false,
		endTimeOpen: false
	});

	const toggleOpen = (key: keyof EventDateState) =>
		setState({ ...state, [key]: !state[key] });

	return (
		<Section marginVertical='l'>
			<View marginHorizontal='m'>
				<SectionHeader text='Event Date' titleVariant='large' />
			</View>
			<View>
				<Controller
					name='doors_open_time'
					control={formMethods.control}
					render={({ field: { value } }) => (
						<MenuListItem
							title='Doors Open'
							secondaryText={
								value ? day(value).format('MMM D, h:mma') : 'No Date Selected'
							}
							onPress={() => toggleOpen('doorsOpenTimeOpen')}
							color='ion'
						/>
					)}
				/>
				<Controller
					name='start_time'
					control={formMethods.control}
					render={({ field: { value } }) => (
						<MenuListItem
							title='Event Start'
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
							title='Event End'
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
					title='Doors Open'
					isOpen={state.doorsOpenTimeOpen}
					toggleModal={() => toggleOpen('doorsOpenTimeOpen')}
					onConfirm={onChangeDoorsOpenTime}
					onCancelled={() => console.log('Cancelled')}
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
			</View>
		</Section>
	);
};

export default EventDateSection;
