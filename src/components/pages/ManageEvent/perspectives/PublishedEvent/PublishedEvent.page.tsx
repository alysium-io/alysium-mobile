import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Avatar, QRCode, ScrollView, Section, Text, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import {
	useClipboard,
	useEventDateFormatter,
	useHyperlink,
	useLocation,
	useNavigation,
	useSheet
} from '@hooks';
import { MenuListItem } from '@molecules';
import { BasePage } from '@organisms';
import { ShareEventPosterSheet } from '@popups';
import Separator from '@src/components/pages/EditArtist/components/Separator';
import SubHeader from '@src/components/pages/Event/components/SubHeader';
import { PageError, StartsInCountdown } from '@templates';
import { NanoId } from '@types';
import React from 'react';
import { Linking } from 'react-native';
import Loading from '../../Loading';
import CompleteEventFooter from './components/CompleteEvent.footer';
import PublishedEventPageHeader from './PublishedEvent.header';
import PopupMenu from './sheets/PopupMenu';

interface PublishedEventPageProps {
	event_uid: NanoId;
	setPublishedToCompleted: () => void;
}

const PublishedEventPage: React.FC<PublishedEventPageProps> = ({
	event_uid,
	setPublishedToCompleted
}) => {
	const shareExternalSheetApi = useSheet();
	const { copy } = useClipboard();
	const { eventPage, editPublishedEventPage } = useNavigation();
	const publishedEventPopupMenuSheet = useSheet();
	const { artistData, isEditable } = useArtistAppContext();
	const { eventPageHyperlink } = useHyperlink();
	const { data: eventData, error } =
		artistEventApiSlice.usePrivateFindOneArtistEventQuery({
			params: {
				event_uid,
				artist_uid: artistData.artist_uid
			}
		});

	const locationApi = useLocation(eventData?.event.location);
	const formattedDateApi = useEventDateFormatter(
		eventData?.event.start_time,
		eventData?.event.end_time
	);

	const onCopyTime = () => {
		const semanticTimeUntil = formattedDateApi.semantic();
		const formattedStartDate = formattedDateApi.startDate();
		const formattedStartTime = formattedDateApi.startTime();
		const duration = formattedDateApi.duration();
		copy(
			`${semanticTimeUntil}, ${formattedStartDate}, ${formattedStartTime}` +
				(formattedDateApi.hasEndDate
					? ` - ${formattedDateApi.endTime()}, ${duration}`
					: ''),
			{
				text2: 'You can now share this time'
			}
		);
	};

	const onCopyEventLink = () => {
		if (eventData) {
			copy(eventPageHyperlink(eventData.event.event_uid), {
				text2: 'You can now share this event'
			});
		}
	};

	const onCopyAddress = () => {
		copy(
			locationApi.build([
				{ type: 'street_number' },
				{ type: 'route', nameLength: 'short_name' },
				{ type: 'neighborhood' },
				{ type: 'postal_code' },
				{ type: 'administrative_area_level_1' },
				{ type: 'country', nameLength: 'short_name' }
			]),
			{
				text2: 'You can now share this address'
			}
		);
	};

	const onViewWebPage = () => {
		if (!eventData) return;
		Linking.openURL(eventPageHyperlink(eventData.event.event_uid));
	};

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
			<PublishedEventPageHeader
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
					{isEditable && (
						<MenuListItem
							onPress={() => editPublishedEventPage(eventData.event.event_uid)}
							prefixIconProps={{
								name: 'settings',
								size: 'm'
							}}
							titleTextProps={{
								title: 'Edit Event',
								bottomSubtext: 'Make last minute changes to your event',
								titleVariant: 'paragraph',
								bottomSubtextColor: 'text.q'
							}}
						/>
					)}
					<MenuListItem
						onPress={onCopyEventLink}
						prefixIconProps={{
							name: 'link',
							size: 'm'
						}}
						icon='event'
						iconProps={{ size: 'm' }}
						titleTextProps={{
							title: 'Copy Event Link',
							bottomSubtext: 'Copy shareable link to your event',
							titleVariant: 'paragraph',
							bottomSubtextColor: 'text.q'
						}}
					/>
					<MenuListItem
						onPress={onCopyAddress}
						prefixIconProps={{
							name: 'link',
							size: 'm'
						}}
						icon='location'
						iconProps={{ size: 'm' }}
						titleTextProps={{
							title: 'Copy Address',
							bottomSubtext: 'Copy the event address to share',
							titleVariant: 'paragraph',
							bottomSubtextColor: 'text.q'
						}}
					/>
					<MenuListItem
						onPress={onCopyTime}
						prefixIconProps={{
							name: 'link',
							size: 'm'
						}}
						icon='clock-filled'
						iconProps={{ size: 'm' }}
						titleTextProps={{
							title: 'Copy Time',
							bottomSubtext: 'Copy the event address to share',
							titleVariant: 'paragraph',
							bottomSubtextColor: 'text.q'
						}}
					/>
					<MenuListItem
						onPress={() =>
							eventPage(eventData.event.event_uid, {
								to: 'EventPage',
								to_uid: eventData.event.event_uid,
								from: 'ManageEventPage',
								from_uid: event_uid,
								using: 'PUBLISHED_EVENT_ACTION_VIEW_LIVE_PAGE_IN_APP'
							})
						}
						prefixIconProps={{
							name: 'logo',
							size: 'm'
						}}
						titleTextProps={{
							title: 'Live Page',
							bottomSubtext: 'View your event page on Alysium',
							titleVariant: 'paragraph',
							bottomSubtextColor: 'text.q'
						}}
					/>
					<MenuListItem
						onPress={onViewWebPage}
						prefixIconProps={{
							name: 'chrome',
							size: 'm'
						}}
						titleTextProps={{
							title: 'Web Page',
							bottomSubtext: 'View your event page on the web',
							titleVariant: 'paragraph',
							bottomSubtextColor: 'text.q'
						}}
					/>
				</Section>
			</ScrollView>
			<PopupMenu
				event_uid={event_uid}
				onPressShare={() => {
					shareExternalSheetApi.open();
				}}
				sheetApi={publishedEventPopupMenuSheet}
			/>
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
