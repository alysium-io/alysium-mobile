import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { artistEventApiSlice } from '@flux/api/event';
import { ComplexEventStatus } from '@flux/api/event/types';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useEvent, useNavigation } from '@hooks';
import { BottomSheet } from '@organisms';
import { NanoId } from '@types';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CancelEventMenuListItem from './components/CancelEventMenuListItem';
import DeleteEventMenuListItem from './components/DeleteEventMenuListItem';
import ShareEventMenuListItem from './components/ShareEventMenuListItem';

interface PopupMenuSheetProps {
	sheetApi: SheetApi;
	event_uid: NanoId;
}

const PopupMenuSheet: React.FC<PopupMenuSheetProps> = ({
	sheetApi,
	event_uid
}) => {
	const insets = useSafeAreaInsets();
	const { back } = useNavigation();
	const { artistData, isEditable } = useArtistAppContext();
	const { data } = artistEventApiSlice.usePrivateFindOneArtistEventQuery({
		params: {
			artist_uid: artistData.artist_uid,
			event_uid
		}
	});
	const { complexStatus, isComingUp } = useEvent(data?.event);

	return (
		<BottomSheet ref={sheetApi.sheetRef}>
			<BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom + 25 }}>
				{isComingUp && <ShareEventMenuListItem event_uid={event_uid} />}

				{isEditable &&
					complexStatus &&
					complexStatus === ComplexEventStatus.coming_up && (
						<CancelEventMenuListItem
							event_uid={event_uid}
							onSuccess={() => {
								sheetApi.close();
								back();
							}}
						/>
					)}

				{isEditable && (
					<DeleteEventMenuListItem
						event_uid={event_uid}
						onSuccess={() => {
							sheetApi.close();
							back();
						}}
					/>
				)}
			</BottomSheetView>
		</BottomSheet>
	);
};

export default PopupMenuSheet;
