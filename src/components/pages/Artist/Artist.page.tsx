import { View } from '@atomic';
import { artistApiSlice } from '@flux/api/artist';
import { artistEventApiSlice } from '@flux/api/event';
import { BasePage, Parallax } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { ParallaxLoading } from '@templates';
import { ArtistPageRouteProp } from '@types';
import React from 'react';
import ArtistPageHeader from './Artist.header';
import ActionButtons from './components/ActionButtons';
import EventsSection from './components/EventsSection';
import GallerySection from './components/GallerySection';
import HistorySection from './components/HistorySection';
import SubHeader from './components/SubHeader';

const ArtistPage: React.FC = () => {
	const route = useRoute<ArtistPageRouteProp>();

	const { data: artistData } = artistApiSlice.usePublicFindOneArtistQuery({
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

	if (!artistData || !eventsData) {
		return <ParallaxLoading />;
	}

	return (
		<BasePage>
			<ArtistPageHeader
				title={artistData.name}
				artist_uid={route.params.artist_uid}
			/>
			<Parallax
				title={artistData.name}
				image={artistData.profile_image?.large.key}
			>
				<View margin='m'>
					<SubHeader artistData={artistData} />
					<ActionButtons artistData={artistData} />
				</View>
				<EventsSection artistData={artistData} eventsData={eventsData} />
				<GallerySection artistData={artistData} />
				<HistorySection
					artist_uid={route.params.artist_uid}
					events={eventsData}
				/>
			</Parallax>
		</BasePage>
	);
};

export default ArtistPage;
