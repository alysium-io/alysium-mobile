import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { Formatting } from '@etc';
import { artistEventApiSlice } from '@flux/api/event';
import { useSheet, useToast } from '@hooks';
import { MenuListItem } from '@molecules';
import { useGlobalLoader } from '@templates';
import { NanoId } from '@types';
import dayjs from 'dayjs';
import React from 'react';
import SelectEventDateTimeBottomSheet from '../sheets/SelectEventDateTimeBottomSheet';
import usePermissionsToastError from './usePermissionsError';

interface DateSectionProps {
	event_uid: NanoId;
	startTime: string | null;
	endTime: string | null;
}

const DateSection: React.FC<DateSectionProps> = ({
	event_uid,
	startTime,
	endTime
}) => {
	const { toastError } = useToast();
	const { showLoader, hideLoader } = useGlobalLoader();
	const { artistData, isEditable } = useArtistAppContext();
	const [patchArtistEventTimeMutation] =
		artistEventApiSlice.usePatchArtistEventTimeMutation();
	const sheetApi = useSheet();
	const defaultStartDateTime = startTime ? new Date(startTime) : null;
	const defaultEndDateTime = endTime ? new Date(endTime) : null;
	const { permissionsError } = usePermissionsToastError();

	const onSave = (startDateTime: Date, endDateTime: Date | null) => {
		const start_time = Formatting.toUtcIsoFormat(startDateTime);
		const end_time = endDateTime
			? Formatting.toUtcIsoFormat(endDateTime)
			: null;
		if (start_time !== null) {
			showLoader();
			patchArtistEventTimeMutation({
				params: {
					event_uid,
					artist_uid: artistData.artist_uid
				},
				body: {
					start_time,
					end_time
				}
			})
				.unwrap()
				.catch((err) => {
					toastError(err?.data?.error?.message ?? 'Error updating event time.');
				})
				.finally(() => {
					sheetApi.close();
					hideLoader();
				});
		} else {
			toastError('Invalid start time');
		}
	};

	const onPress = isEditable ? sheetApi.open : permissionsError;

	return (
		<View>
			<MenuListItem
				onPress={onPress}
				prefixIconProps={{
					name: 'clock-filled',
					size: 'l'
				}}
				titleTextProps={{
					title: defaultStartDateTime
						? dayjs(defaultStartDateTime).format('dddd, MMM. Do')
						: 'When?',
					titleVariant: 'paragraph-medium',
					bottomSubtextVariant: 'paragraph-small',
					bottomSubtextColor: 'text.q',
					bottomSubtext: defaultStartDateTime
						? dayjs(defaultStartDateTime).format('h:mma')
						: 'Select a date and time'
				}}
			/>
			<SelectEventDateTimeBottomSheet
				sheetApi={sheetApi}
				defaultStartDateTime={defaultStartDateTime}
				defaultEndDateTime={defaultEndDateTime}
				onPressSave={onSave}
			/>
		</View>
	);
};

export default DateSection;
