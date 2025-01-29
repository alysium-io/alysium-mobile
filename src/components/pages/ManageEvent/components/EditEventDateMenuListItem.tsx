import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Formatting } from '@etc';
import { artistEventApiSlice } from '@flux/api/event';
import { useSheet } from '@hooks';
import { MenuListItem } from '@molecules';
import { useGlobalLoader } from '@templates';
import { NanoId } from '@types';
import dayjs from 'dayjs';
import React from 'react';
import Toast from 'react-native-toast-message';
import usePermissionsToastError from '../hooks/usePermissionsError';
import SelectEventDateTimeBottomSheet from '../sheets/SelectEventDateTimeBottomSheet';

interface EditEventDateMenuListItemProps {
	event_uid: NanoId;
	startTime: string | null;
	endTime: string | null;
}

const EditEventDateMenuListItem: React.FC<EditEventDateMenuListItemProps> = ({
	event_uid,
	startTime,
	endTime
}) => {
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
					Toast.show({
						text1: 'Error',
						text2: err?.data?.error?.message ?? 'Error updating event time.'
					});
				})
				.finally(() => {
					sheetApi.close();
					hideLoader();
				});
		} else {
			Toast.show({
				text1: 'Error',
				text2: 'Invalid start time'
			});
		}
	};

	const onPress = isEditable ? sheetApi.open : permissionsError;

	return (
		<>
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
		</>
	);
};

export default EditEventDateMenuListItem;
