import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Avatar, QRCode, ScrollView, Section, Text, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { useHyperlink, useSheet } from '@hooks';
import { BasePage } from '@organisms';
import Separator from '@src/components/pages/EditArtist/components/Separator';
import SubHeader from '@src/components/pages/Event/components/SubHeader';
import { NanoId } from '@types';
import React from 'react';
import { Loading } from '../../Loading';
import CanceledEventPageHeader from './CanceledEvent.header';

interface CanceledEventPageProps {
	event_uid: NanoId;
}

const CanceledEventPage: React.FC<CanceledEventPageProps> = ({ event_uid }) => {
	const publishedEventPopupMenuSheet = useSheet();
	const { artistData } = useArtistAppContext();
	const { eventPageHyperlink } = useHyperlink();
	const { data: eventData } =
		artistEventApiSlice.usePrivateFindOneArtistEventQuery({
			params: {
				event_uid,
				artist_uid: artistData.artist_uid
			}
		});

	if (!eventData) {
		return <Loading />;
	}

	return (
		<BasePage>
			<CanceledEventPageHeader eventData={eventData} />
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
							<Text
								variant='paragraph-small-medium'
								textDecorationLine='underline'
								color='text.q'
							>
								Canceled
							</Text>
						</View>
					</View>
					<SubHeader eventData={eventData} />
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
			</ScrollView>
		</BasePage>
	);
};

export default CanceledEventPage;
