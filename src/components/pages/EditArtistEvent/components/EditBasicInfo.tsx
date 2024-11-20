import { View } from '@atomic';
import { Formatting } from '@etc';
import { useSheet } from '@hooks';
import { MenuListItem } from '@molecules';
import { SelectEventDateTimeBottomSheet } from '@popups';
import { UpdateArtistEventFormApi } from '@src/utils/redux-hook-form/useUpdateArtistEventFormApi';
import day from 'dayjs';
import React from 'react';
import { Controller } from 'react-hook-form';

interface EditBasicInfoProps {
	updateArtistEventFormApi: UpdateArtistEventFormApi;
	onBlurEditable: () => void;
}

const EditBasicInfo: React.FC<EditBasicInfoProps> = ({
	updateArtistEventFormApi,
	onBlurEditable
}) => {
	const sheetApi = useSheet();

	const onPressSave = (startDateTime: Date, endDateTime: Date | null) => {
		updateArtistEventFormApi.formMethods.setValue(
			'start_time',
			Formatting.toUtcIsoFormat(startDateTime)
		);
		updateArtistEventFormApi.formMethods.setValue(
			'end_time',
			Formatting.toUtcIsoFormat(endDateTime)
		);
		onBlurEditable();
	};

	const startTime =
		updateArtistEventFormApi.formMethods.getValues('start_time');
	const endTime = updateArtistEventFormApi.formMethods.getValues('end_time');

	const defaultStartDateTime = startTime ? new Date(startTime) : null;
	const defaultEndDateTime = endTime ? new Date(endTime) : null;

	return (
		<View>
			<Controller
				name='start_time'
				control={updateArtistEventFormApi.formMethods.control}
				render={({ field: { value } }) => (
					<MenuListItem
						titleTextProps={{
							title: value ? day(value).format('dddd, MMM. Do') : 'Event Date',
							titleVariant: 'paragraph-medium',
							bottomSubtextVariant: 'paragraph-small',
							bottomSubtextColor: 'text.q',
							bottomSubtext: value
								? day(value).format('h:mma')
								: 'No Date Selected'
						}}
						onPress={sheetApi.open}
					/>
				)}
			/>
			<SelectEventDateTimeBottomSheet
				sheetApi={sheetApi}
				defaultStartDateTime={defaultStartDateTime}
				defaultEndDateTime={defaultEndDateTime}
				onPressSave={onPressSave}
			/>
		</View>
	);
};

export default EditBasicInfo;
