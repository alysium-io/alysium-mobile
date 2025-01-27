import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { artistEventApiSlice } from '@flux/api/event';
import { ComplexEventStatus, EventStatus } from '@flux/api/event/types';
import { useEvent } from '@hooks';
import { MenuListItem } from '@molecules';
import { Alert, useGlobalLoader } from '@templates';
import { NanoId } from '@types';
import React from 'react';
import Toast from 'react-native-toast-message';

interface CancelEventMenuListItemProps {
	event_uid: NanoId;
	onSuccess?: () => void;
	onError?: () => void;
}

const CancelEventMenuListItem: React.FC<CancelEventMenuListItemProps> = ({
	event_uid,
	onSuccess,
	onError
}) => {
	const { showLoader, hideLoader } = useGlobalLoader();
	const { artistData, isEditable } = useArtistAppContext();
	const [patchArtistEventStatusMutation] =
		artistEventApiSlice.usePatchArtistEventStatusMutation();
	const { data } = artistEventApiSlice.usePrivateFindOneArtistEventQuery({
		params: {
			artist_uid: artistData.artist_uid,
			event_uid
		}
	});
	const { complexStatus } = useEvent(data?.event);

	const onCancel = () => {
		Alert.alert('Cancel Event', 'You cannot undo this operation.', [
			{
				text: "Don't Cancel",
				style: 'cancel'
			},
			{
				text: 'Cancel Event',
				onPress: async () => {
					try {
						showLoader();
						await patchArtistEventStatusMutation({
							params: {
								artist_uid: artistData.artist_uid,
								event_uid
							},
							body: {
								status: EventStatus.canceled
							}
						}).unwrap();
						onSuccess?.();
					} catch (error) {
						onError?.();
						Toast.show({
							text1: 'Error',
							text2: 'Failed to cancel event'
						});
					} finally {
						hideLoader();
					}
				},
				style: 'destructive'
			}
		]);
	};

	return (
		isEditable &&
		complexStatus &&
		complexStatus === ComplexEventStatus.coming_up && (
			<MenuListItem
				titleTextProps={{
					title: 'Cancel Event',
					titleVariant: 'paragraph',
					bottomSubtext: 'You cannot undo this action',
					bottomSubtextVariant: 'paragraph-small',
					bottomSubtextColor: 'text.q'
				}}
				icon='cancel'
				iconProps={{ size: 'm' }}
				onPress={onCancel}
			/>
		)
	);
};

export default CancelEventMenuListItem;
