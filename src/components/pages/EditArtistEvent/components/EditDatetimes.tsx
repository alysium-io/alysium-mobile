import { View } from '@atomic';
import { Formatting } from '@etc';
import { MenuListItem } from '@molecules';
import { DatetimePickerWithModal } from '@organisms';
import { UpdateArtistEventFormApi } from '@src/utils/redux-hook-form/useUpdateArtistEventFormApi';
import day from 'dayjs';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

type SlotTimeState = {
	startTimeOpen: boolean;
	endTimeOpen: boolean;
};

interface EditDatetimesProps {
	updateArtistEventFormApi: UpdateArtistEventFormApi;
	onBlurEditable: () => void;
}

const EditDatetimes: React.FC<EditDatetimesProps> = ({
	updateArtistEventFormApi,
	onBlurEditable
}) => {
	const [state, setState] = useState<SlotTimeState>({
		startTimeOpen: false,
		endTimeOpen: false
	});

	const toggleOpen = (key: keyof SlotTimeState) =>
		setState({ ...state, [key]: !state[key] });

	const onConfirm = (field: 'start_time' | 'end_time') => (date: Date) => {
		console.log(Formatting.toUtcIsoFormat(date));
		updateArtistEventFormApi.formMethods.setValue(
			field,
			Formatting.toUtcIsoFormat(date)
		);
		onBlurEditable();
	};

	const fieldValue = (field: 'start_time' | 'end_time') => {
		const value = updateArtistEventFormApi.formMethods.getValues(field);
		return value ? new Date(value) : new Date();
	};

	return (
		<View>
			<Controller
				name='start_time'
				control={updateArtistEventFormApi.formMethods.control}
				render={({ field: { value } }) => (
					<MenuListItem
						titleTextProps={{
							title: 'Start Time',
							titleVariant: 'paragraph-medium',
							bottomSubtextVariant: 'paragraph-small',
							bottomSubtextColor: 'text.q',
							bottomSubtext: value
								? day(value).format('MMM D, h:mma')
								: 'No Date Selected'
						}}
						onPress={() => toggleOpen('startTimeOpen')}
					/>
				)}
			/>
			<Controller
				name='end_time'
				control={updateArtistEventFormApi.formMethods.control}
				render={({ field: { value } }) => (
					<MenuListItem
						titleTextProps={{
							title: 'End Time',
							titleVariant: 'paragraph-medium',
							bottomSubtextVariant: 'paragraph-small',
							bottomSubtextColor: 'text.q',
							bottomSubtext: value
								? day(value).format('MMM D, h:mma')
								: 'No Date Selected'
						}}
						onPress={() => toggleOpen('endTimeOpen')}
					/>
				)}
			/>
			<DatetimePickerWithModal
				title='Event Start'
				isOpen={state.startTimeOpen}
				toggleModal={() => toggleOpen('startTimeOpen')}
				onConfirm={onConfirm('start_time')}
				defaultDate={fieldValue('start_time')}
			/>
			<DatetimePickerWithModal
				title='Event End'
				isOpen={state.endTimeOpen}
				toggleModal={() => toggleOpen('endTimeOpen')}
				onConfirm={onConfirm('end_time')}
				defaultDate={fieldValue('end_time')}
			/>
		</View>
	);
};

export default EditDatetimes;
