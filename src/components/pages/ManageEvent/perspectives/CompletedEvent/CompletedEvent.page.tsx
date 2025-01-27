import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { ScrollView, Section } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { GalleryRefType } from '@flux/api/gallery/types';
import { BasePage, Gallery } from '@organisms';
import Separator from '@src/components/pages/EditArtist/components/Separator';
import { PageError } from '@templates';
import { NanoId } from '@types';
import React from 'react';
import PublicEventHeader from '../../components/PublicEvent.header';
import PublicEventTitle from '../../components/PublicEventTitle';
import Loading from '../../Loading';

interface CompletedEventPageProps {
	event_uid: NanoId;
}

const CompletedEventPage: React.FC<CompletedEventPageProps> = ({
	event_uid
}) => {
	const { artistData } = useArtistAppContext();
	const { data: eventData, error } =
		artistEventApiSlice.usePrivateFindOneArtistEventQuery({
			params: {
				event_uid,
				artist_uid: artistData.artist_uid
			}
		});

	if (error) {
		return <PageError error={error} />;
	}

	if (!eventData) {
		return <Loading />;
	}

	return (
		<BasePage>
			<PublicEventHeader event={eventData} />
			<ScrollView>
				<PublicEventTitle event={eventData} />
				<Section>
					<Gallery
						gallery={eventData.event.gallery}
						galleryRefType={GalleryRefType.artistEvent}
						galleryRefUid={eventData.event.event_uid}
					/>
					<Separator size='thick' />
				</Section>
			</ScrollView>
		</BasePage>
	);
};

export default CompletedEventPage;
