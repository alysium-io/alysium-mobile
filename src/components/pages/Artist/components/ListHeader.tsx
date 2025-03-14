import { View } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useSplitEventsByComplexStatus, withPoke } from '@hooks';
import { ParallaxView } from '@organisms';
import React from 'react';
import { SharedValue } from 'react-native-reanimated';
import ActionButtons from './ActionButtons';
import EventsMap from './EventsMap';
import EventsSection from './EventsSection';
import LiveEventsSection from './LiveEventsSection';
import SubHeader from './SubHeader';

type ListHeaderProps = {
	artistData?: PublicFindOneArtistResponseDto;
	eventsData?: EventLink[];
	scrollOffset: SharedValue<number>;
};

const ListHeader: React.FC<ListHeaderProps> = React.memo(
	({ artistData, eventsData, scrollOffset }) => {
		const { live, coming_up } = useSplitEventsByComplexStatus(eventsData);
		withPoke({
			interval: 1,
			enabled: true,
			checkFn: () => ({ live, coming_up }),
			name: 'ArtistPage'
		});
		if (!artistData || !eventsData) return null;
		return (
			<ParallaxView
				title={artistData.name}
				image={artistData.profile_image?.large.key}
				HeaderComponent={() => (
					<>
						<View margin='m'>
							<SubHeader artistData={artistData} />
							<ActionButtons artistData={artistData} />
						</View>
						<LiveEventsSection
							artistData={artistData}
							eventsData={eventsData}
						/>
						<EventsSection artistData={artistData} eventsData={eventsData} />
						<EventsMap eventsData={eventsData} artistData={artistData} />
					</>
				)}
				scrollOffset={scrollOffset}
			/>
		);
	}
);

export default ListHeader;
