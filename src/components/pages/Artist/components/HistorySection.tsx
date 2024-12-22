import { Section, Text } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useNavigation } from '@hooks';
import { TimelineListItem } from '@molecules';
import { NanoId } from '@types';
import dayjs from 'dayjs';
import React from 'react';

interface HistorySectionProps {
	artist_uid: NanoId;
	events?: EventLink[];
}

const HistorySection: React.FC<HistorySectionProps> = ({
	artist_uid,
	events
}) => {
	const { eventPage } = useNavigation();
	if (!events) return null;

	if (events?.length === 0) {
		return (
			<Section>
				<Text
					variant='section-header-2'
					textDecorationLine='underline'
					textAlign='center'
					marginBottom='m'
				>
					No History
				</Text>
			</Section>
		);
	}

	return (
		<Section>
			<Text
				variant='section-header-2'
				textDecorationLine='underline'
				textAlign='center'
				marginBottom='m'
			>
				History
			</Text>
			{events.map((event, index) => (
				<TimelineListItem
					key={event.event.event_uid}
					onPress={() =>
						eventPage(event.event.event_uid, {
							from: 'ArtistPage',
							from_uid: artist_uid,
							to: 'EventPage',
							to_uid: event.event.event_uid,
							using: 'EVENT_PAGE_ARTIST_EVENT_HISTORY'
						})
					}
					titleTextProps={{
						title: event.event.name,
						bottomSubtext: event.event.location?.formatted_address || ''
					}}
					timeLineProps={{
						topTailProps: { vertical: index === 0 ? 'none' : 'top' }
					}}
					profileImageProps={{
						image: event.event.profile_image?.medium.key
					}}
					fixedTextProps={{
						text: dayjs(event.event.start_time).format('MMM. Do')
					}}
				/>
			))}
			<TimelineListItem
				titleTextProps={{ title: '' }}
				timeLineProps={{
					bottomTailProps: { vertical: 'none' },
					markerProps: { type: 'circle' }
				}}
				fixedTextProps={{ text: 'end' }}
			/>
		</Section>
	);
};

export default HistorySection;
