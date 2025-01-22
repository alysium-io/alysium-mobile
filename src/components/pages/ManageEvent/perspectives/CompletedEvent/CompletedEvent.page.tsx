import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Avatar, ScrollView, Section, Text, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { GalleryRefType } from '@flux/api/gallery/types';
import { useHyperlink, useSheet } from '@hooks';
import { BasePage, Gallery } from '@organisms';
import Separator from '@src/components/pages/EditArtist/components/Separator';
import SubHeader from '@src/components/pages/Event/components/SubHeader';
import { PageError, StartsInCountdown } from '@templates';
import { NanoId } from '@types';
import React from 'react';
import Loading from '../../Loading';
import CompletedEventPageHeader from './CompletedEventPageHeader.header';

interface CompletedEventPageProps {
	event_uid: NanoId;
}

const CompletedEventPage: React.FC<CompletedEventPageProps> = ({
	event_uid
}) => {
	const publishedEventPopupMenuSheet = useSheet();
	const { artistData } = useArtistAppContext();
	const { eventPageHyperlink } = useHyperlink();
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
			<CompletedEventPageHeader
				eventData={eventData}
				onPressMenu={() => {
					publishedEventPopupMenuSheet.open();
				}}
			/>
			<ScrollView>
				<View margin='m'>
					<View flexDirection='row' alignItems='center' marginBottom='m'>
						<View height={100} width={100}>
							<Avatar
								image={eventData.event.profile_image?.medium.key}
								defaultImageProps={{
									icon: 'event'
								}}
							/>
						</View>
						<View marginLeft='m'>
							<Text variant='paragraph-large-medium' marginBottom='s'>
								{eventData.event.name}
							</Text>
							<StartsInCountdown event={eventData?.event} />
						</View>
					</View>
					<SubHeader eventData={eventData} />
				</View>
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
