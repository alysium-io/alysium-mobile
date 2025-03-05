import { View } from '@atomic';
import { artistApiSlice } from '@flux/api/artist';
import { artistEventApiSlice } from '@flux/api/event';
import { useSplitEventsByComplexStatus, withPoke } from '@hooks';
import { BasePage, Parallax } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { PageError, ParallaxLoading } from '@templates';
import { ArtistPageRouteProp } from '@types';
import React from 'react';
import { Case, Switch } from 'react-if';
import ArtistPageHeader from './Artist.header';
import ActionButtons from './components/ActionButtons';
import BlockedArtistSection from './components/BlockedArtistSection';
import EventsMap from './components/EventsMap';
import EventsSection from './components/EventsSection';
import HistorySection from './components/HistorySection';
import LiveEventsSection from './components/LiveEventsSection';
import SubHeader from './components/SubHeader';

const ArtistPage: React.FC = () => {
	const route = useRoute<ArtistPageRouteProp>();

	const { data: artistData, error } =
		artistApiSlice.usePublicFindOneArtistQuery({
			params: { artist_uid: route.params.artist_uid }
		});

	const { data: eventsData } =
		artistEventApiSlice.usePublicFindAllArtistEventsQuery({
			params: { artist_uid: route.params.artist_uid },
			query: {
				page: 1,
				limit: 20
			}
		});

	const { live, coming_up } = useSplitEventsByComplexStatus(eventsData);
	withPoke({
		interval: 1,
		enabled: true,
		checkFn: () => ({ live, coming_up }),
		name: 'ArtistPage'
	});

	if (error) {
		return <PageError error={error} />;
	}

	if (!artistData || !eventsData) {
		return <ParallaxLoading />;
	}

	return (
		<BasePage>
			<ArtistPageHeader title={artistData.name} artist={artistData} />
			<Parallax
				title={artistData.name}
				image={artistData.profile_image?.large.key}
			>
				<Switch>
					<Case condition={artistData.is_blocked}>
						<View margin='m'>
							<SubHeader artistData={artistData} />
							<BlockedArtistSection />
						</View>
					</Case>
					<Case condition={!artistData.is_blocked}>
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
						<HistorySection artist_uid={route.params.artist_uid} />
					</Case>
				</Switch>
			</Parallax>
		</BasePage>
	);
};

export default ArtistPage;
