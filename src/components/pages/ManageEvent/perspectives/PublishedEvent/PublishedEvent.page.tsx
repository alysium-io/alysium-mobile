import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { QRCode, ScrollView, Section, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { useHyperlink, useNavigation, useSheet } from '@hooks';
import { BasePage } from '@organisms';
import { ShareEventPosterSheet } from '@popups';
import SimpleButton from '@src/components/molecules/Buttons/SimpleButton';
import Separator from '@src/components/pages/EditArtist/components/Separator';
import { PageError } from '@templates';
import { NanoId } from '@types';
import React from 'react';
import Actions from '../../components/Actions';
import PublicEventHeader from '../../components/PublicEvent.header';
import PublicEventTitle from '../../components/PublicEventTitle';
import Loading from '../../Loading';
import CompleteEventFooter from './CompleteEvent.footer';

interface PublishedEventPageProps {
	event_uid: NanoId;
	setPublishedToCompleted: () => void;
}

const PublishedEventPage: React.FC<PublishedEventPageProps> = ({
	event_uid,
	setPublishedToCompleted
}) => {
	const { eventPage, editPublishedEventPage } = useNavigation();
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
				<View margin='m' columnGap='m' flexDirection='row'>
					<SimpleButton
						onPress={() => editPublishedEventPage(eventData.event.event_uid)}
						style={{ flex: 1 }}
						text='Edit Event'
					/>
					<SimpleButton
						onPress={() =>
							eventPage(eventData.event.event_uid, {
								to: 'EventPage',
								to_uid: eventData.event.event_uid,
								from: 'ManageEventPage',
								from_uid: eventData.event.event_uid,
								using: 'EVENT_PAGE_VIEW_PAGE_SIMPLE_BUTTON'
							})
						}
						style={{ flex: 1 }}
						text='View Page'
						afterIconProps={{ name: 'arrow-right' }}
					/>
				</View>
				<Section>
					<View alignItems='center'>
						<QRCode
							data={eventPageHyperlink(eventData.event.event_uid)}
							size={1}
						/>
					</View>
					<Separator size='thick' />
				</Section>
				<Actions event_uid={eventData.event.event_uid} />
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
