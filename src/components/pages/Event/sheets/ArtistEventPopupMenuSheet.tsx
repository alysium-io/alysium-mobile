import { EventLink } from '@flux/api/event-link/event-link.entity';
import { ReportedContentType } from '@flux/api/reported-content/types';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useClipboard, useHyperlink, useSheet } from '@hooks';
import { MenuListItem } from '@molecules';
import { BottomSheet } from '@organisms';
import { ShareEventPosterSheet, useReportedContentContext } from '@popups';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ArtistEventPopupMenuSheetProps {
	sheetApi: SheetApi;
	event: EventLink;
}

const ArtistEventPopupMenuSheet: React.FC<ArtistEventPopupMenuSheetProps> = ({
	sheetApi,
	event
}) => {
	const { eventPageHyperlink } = useHyperlink();
	const insets = useSafeAreaInsets();
	const shareEventPosterSheetApi = useSheet();
	const { copy } = useClipboard();
	const { openReportSheet } = useReportedContentContext();

	return (
		<>
			<BottomSheet ref={sheetApi.sheetRef} enableDynamicSizing>
				<BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom + 25 }}>
					<MenuListItem
						onPress={shareEventPosterSheetApi.open}
						titleTextProps={{
							title: 'Share',
							bottomSubtext: 'iMessage, Instagram, etc.',
							titleVariant: 'paragraph',
							bottomSubtextVariant: 'paragraph-small',
							bottomSubtextColor: 'text.q'
						}}
						icon='share-filled'
						iconProps={{
							size: 'm'
						}}
					/>
					<MenuListItem
						onPress={() =>
							copy(eventPageHyperlink(event.event.event_uid), {
								text2: 'You can now share this event'
							})
						}
						titleTextProps={{
							title: 'Copy Link',
							bottomSubtext: 'Copy shareable link to the event',
							titleVariant: 'paragraph',
							bottomSubtextVariant: 'paragraph-small',
							bottomSubtextColor: 'text.q'
						}}
						icon='link'
						iconProps={{
							size: 'm'
						}}
					/>
					<MenuListItem
						onPress={() => {
							openReportSheet({
								referenceType: ReportedContentType.event,
								referenceUid: event.event.event_uid
							});
						}}
						titleTextProps={{
							title: 'Report',
							bottomSubtext: 'Report this artist',
							titleVariant: 'paragraph',
							bottomSubtextColor: 'text.q'
						}}
						icon='flag'
						iconProps={{ size: 'm' }}
					/>
				</BottomSheetView>
			</BottomSheet>
			<ShareEventPosterSheet
				event={event}
				sheetApi={shareEventPosterSheetApi}
			/>
		</>
	);
};

export default ArtistEventPopupMenuSheet;
