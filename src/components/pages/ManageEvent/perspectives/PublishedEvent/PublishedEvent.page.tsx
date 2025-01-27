import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { QRCode, ScrollView, Section, Text, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { useHyperlink, useSheet } from '@hooks';
import { BasePage } from '@organisms';
import { ShareEventPosterSheet } from '@popups';
import Separator from '@src/components/pages/EditArtist/components/Separator';
import { PageError } from '@templates';
import { NanoId } from '@types';
import React from 'react';
import PublicEventHeader from '../../components/PublicEvent.header';
import PublicEventTitle from '../../components/PublicEventTitle';
import Loading from '../../Loading';
import CompleteEventFooter from './CompleteEvent.footer';
import ActionCopyAddress from './components/ActionCopyAddress';
import ActionCopyEventLink from './components/ActionCopyEventLink';
import ActionCopyTime from './components/ActionCopyTime';
import ActionEditPublishedEvent from './components/ActionEditPublishedEvent';
import ActionGoToLivePage from './components/ActionGoToLivePage';
import ActionGoToWebPage from './components/ActionGoToWebPage';

interface PublishedEventPageProps {
	event_uid: NanoId;
	setPublishedToCompleted: () => void;
}

const PublishedEventPage: React.FC<PublishedEventPageProps> = ({
	event_uid,
	setPublishedToCompleted
}) => {
	const shareExternalSheetApi = useSheet();
	const { eventPageHyperlink } = useHyperlink();
	const { artistData } = useArtistAppContext();
	const { data: eventData, error } =
		artistEventApiSlice.usePrivateFindOneArtistEventQuery({
			params: {
				event_uid,
				artist_uid: artistData.artist_uid
			}
		});

	const FooterComponent = () => {
		return (
			<CompleteEventFooter
				event={eventData}
				setPublishedToCompleted={setPublishedToCompleted}
			/>
		);
	};

	if (error) {
		return <PageError error={error} />;
	}

	if (!eventData) {
		return <Loading />;
	}

	return (
		<BasePage FooterComponent={FooterComponent}>
			<PublicEventHeader event={eventData} />
			<ScrollView>
				<PublicEventTitle event={eventData} />
				<Section>
					<View alignItems='center'>
						<QRCode
							data={eventPageHyperlink(eventData.event.event_uid)}
							size={1}
						/>
					</View>
					<Separator size='thick' />
				</Section>
				<Section>
					<Text variant='section-header-2' marginHorizontal='m'>
						Actions
					</Text>
					<ActionEditPublishedEvent event_uid={event_uid} />
					<ActionCopyEventLink event_uid={event_uid} />
					<ActionCopyAddress event_uid={event_uid} />
					<ActionCopyTime event_uid={event_uid} />
					<ActionGoToLivePage event_uid={event_uid} />
					<ActionGoToWebPage event_uid={event_uid} />
				</Section>
			</ScrollView>
			{eventData && (
				<ShareEventPosterSheet
					event={eventData}
					sheetApi={shareExternalSheetApi}
				/>
			)}
		</BasePage>
	);
};

export default PublishedEventPage;
