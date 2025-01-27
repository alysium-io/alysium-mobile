import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { artistEventApiSlice } from '@flux/api/event';
import { useClipboard, useEventDateFormatter } from '@hooks';
import { MenuListItem } from '@molecules';
import { NanoId } from '@types';
import React from 'react';

interface ActionCopyTimeProps {
	event_uid: NanoId;
}

const ActionCopyTime: React.FC<ActionCopyTimeProps> = ({ event_uid }) => {
	const { artistData } = useArtistAppContext();
	const { copy } = useClipboard();
	const { data: eventData } =
		artistEventApiSlice.usePrivateFindOneArtistEventQuery({
			params: {
				event_uid,
				artist_uid: artistData.artist_uid
			}
		});
	const formattedDateApi = useEventDateFormatter(
		eventData?.event.start_time,
		eventData?.event.end_time
	);

	const onCopyTime = () => {
		const semanticTimeUntil = formattedDateApi.semantic();
		const formattedStartDate = formattedDateApi.startDate();
		const formattedStartTime = formattedDateApi.startTime();
		const duration = formattedDateApi.duration();
		copy(
			`${semanticTimeUntil}, ${formattedStartDate}, ${formattedStartTime}` +
				(formattedDateApi.hasEndDate
					? ` - ${formattedDateApi.endTime()}, ${duration}`
					: ''),
			{
				text2: 'You can now share this time'
			}
		);
	};

	return (
		<MenuListItem
			onPress={onCopyTime}
			prefixIconProps={{
				name: 'link',
				size: 'm'
			}}
			icon='clock-filled'
			iconProps={{ size: 'm' }}
			titleTextProps={{
				title: 'Copy Time',
				bottomSubtext: 'Copy the event address to share',
				titleVariant: 'paragraph',
				bottomSubtextColor: 'text.q'
			}}
		/>
	);
};

export default ActionCopyTime;
