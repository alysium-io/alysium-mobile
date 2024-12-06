import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Section, Text } from '@atomic';
import { Formatting } from '@etc';
import { artistEventApiSlice } from '@flux/api/event';
import { useSheet } from '@hooks';
import { MenuListItem } from '@molecules';
import { SelectEventDateTimeBottomSheet } from '@popups';
import { NanoId } from '@types';
import day from 'dayjs';
import React from 'react';
import Separator from '../../EditArtist/components/Separator';

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
	const { artistData } = useArtistAppContext();
	const [updateArtistEventMutation] =
		artistEventApiSlice.useUpdateArtistEventMutation();
	const sheetApi = useSheet();
	const defaultStartDateTime = startTime ? new Date(startTime) : null;
	const defaultEndDateTime = endTime ? new Date(endTime) : null;

	const onSave = (startDateTime: Date, endDateTime: Date | null) => {
		updateArtistEventMutation({
			params: {
				event_uid,
				artist_uid: artistData.artist_uid
			},
			body: {
				start_time: Formatting.toUtcIsoFormat(startDateTime),
				end_time: endDateTime ? Formatting.toUtcIsoFormat(endDateTime) : null
			}
		});
	};

	return (
		<Section>
			<Text variant='section-header-2' marginHorizontal='m'>
				Date
			</Text>
			<MenuListItem
				titleTextProps={{
					title: defaultStartDateTime
						? day(defaultStartDateTime).format('dddd, MMM. Do')
						: 'Event Date',
					titleVariant: 'paragraph-medium',
					bottomSubtextVariant: 'paragraph-small',
					bottomSubtextColor: 'text.q',
					bottomSubtext: defaultStartDateTime
						? day(defaultStartDateTime).format('h:mma')
						: 'No Date Selected'
				}}
				onPress={sheetApi.open}
			/>
			<SelectEventDateTimeBottomSheet
				sheetApi={sheetApi}
				defaultStartDateTime={defaultStartDateTime}
				defaultEndDateTime={defaultEndDateTime}
				onPressSave={onSave}
			/>
			<Separator marginTop='m' />
		</Section>
	);
};

export default DateSection;
