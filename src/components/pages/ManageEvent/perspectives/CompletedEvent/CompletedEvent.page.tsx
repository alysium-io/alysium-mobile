import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { ScrollView, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { useTheme } from '@hooks';
import { BasePage } from '@organisms';
import { PageError } from '@templates';
import { NanoId } from '@types';
import React from 'react';
import EditAndViewSimpleButtons from '../../components/EditAndViewSimpleButtons';
import EventMediaSection from '../../components/EventMediaSection/EditEventMediaSection';
import PublicEventHeader from '../../components/PublicEvent.header';
import PublicEventTitle from '../../components/PublicEventTitle';
import Loading from '../../Loading';

interface CompletedEventPageProps {
	event_uid: NanoId;
}

const CompletedEventPage: React.FC<CompletedEventPageProps> = ({
	event_uid
}) => {
	const { theme } = useTheme();
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
			<ScrollView contentContainerStyle={{ gap: theme.spacing.xxl }}>
				<View>
					<PublicEventTitle event={eventData} />
					<EditAndViewSimpleButtons eventData={eventData} />
				</View>
				<EventMediaSection event={eventData} />
			</ScrollView>
		</BasePage>
	);
};

export default CompletedEventPage;
