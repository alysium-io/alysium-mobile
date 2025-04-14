import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { ScrollView, Separator, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { useSheet, useTheme } from '@hooks';
import { BasePage } from '@organisms';
import { ShareEventPosterSheet } from '@popups';
import { PageError } from '@templates';
import { NanoId } from '@types';
import React from 'react';
import Actions from '../../components/Actions';
import EditAndViewSimpleButtons from '../../components/EditAndViewSimpleButtons';
import PublicEventHeader from '../../components/PublicEvent.header';
import PublicEventTitle from '../../components/PublicEventTitle';
import Loading from '../../Loading';
import CompleteEventFooter from './CompleteEvent.footer';
import QRCodeSection from './components/QRCodeSection';

interface PublishedEventPageProps {
	event_uid: NanoId;
	setPublishedToCompleted: () => void;
}

const PublishedEventPage: React.FC<PublishedEventPageProps> = ({
	event_uid,
	setPublishedToCompleted
}) => {
	const { theme } = useTheme();

	const shareExternalSheetApi = useSheet();
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
			<ScrollView contentContainerStyle={{ gap: theme.spacing.xxl }}>
				<View>
					<PublicEventTitle event={eventData} />
					<EditAndViewSimpleButtons eventData={eventData} />
				</View>
				<QRCodeSection eventData={eventData} />
				<Separator size='thick' />
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
