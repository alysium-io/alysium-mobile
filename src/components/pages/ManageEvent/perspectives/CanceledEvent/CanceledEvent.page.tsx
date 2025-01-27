import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { QRCode, ScrollView, Section, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { useHyperlink } from '@hooks';
import { BasePage } from '@organisms';
import Separator from '@src/components/pages/EditArtist/components/Separator';
import { PageError } from '@templates';
import { NanoId } from '@types';
import React from 'react';
import PublicEventHeader from '../../components/PublicEvent.header';
import PublicEventTitle from '../../components/PublicEventTitle';
import Loading from '../../Loading';

interface CanceledEventPageProps {
	event_uid: NanoId;
}

const CanceledEventPage: React.FC<CanceledEventPageProps> = ({ event_uid }) => {
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
			</ScrollView>
		</BasePage>
	);
};

export default CanceledEventPage;
