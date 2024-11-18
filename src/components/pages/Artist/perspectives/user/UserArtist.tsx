import { View } from '@atomic';
import { BasePage } from '@organisms';
import ParallaxScroll from '@src/components/organisms/Parallax/ParallaxScroll';
import { NanoId } from '@types';
import React from 'react';
import ArtistPageHeader from '../../Artist.header';
import SubHeader from '../../components/SubHeader';
import ActionButtons from './components/ActionButtons';
import ArtistTags from './components/ArtistTags';
import EventsSection from './components/EventsSection';
import ExternalUrlsSection from './components/ExternalUrlsSection';
import GallerySection from './components/GallerySection';
import RelatedArtists from './components/RelatedArtists';
import useUserArtistPage from './useUserArtistPage';

interface UserArtistProps {
	artist_uid: NanoId;
}

const UserArtist: React.FC<UserArtistProps> = ({ artist_uid }) => {
	const { artistData } = useUserArtistPage(artist_uid);

	if (!artistData) {
		return null;
	}

	return (
		<BasePage>
			<ArtistPageHeader title={artistData.name} />
			<ParallaxScroll
				title={artistData.name}
				image={artistData.profile_image?.large.key}
			>
				<View margin='m'>
					<SubHeader artistData={artistData} />
					<ActionButtons artistData={artistData} />
					<ArtistTags artistData={artistData} />
				</View>
				<EventsSection artistData={artistData} />
				<ExternalUrlsSection artistData={artistData} />
				<GallerySection artistData={artistData} />
				<RelatedArtists artist_uid={artist_uid} />
			</ParallaxScroll>
		</BasePage>
	);
};

export default UserArtist;
