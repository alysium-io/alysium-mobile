import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { LView, Section, Text } from '@atomic';
import { Formatting } from '@etc';
import { useDispatch } from '@flux';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { eventMediaApiSlice } from '@flux/api/event-media';
import { MediaType } from '@flux/api/media/types';
import { useImage, usePhotosAndCamera, useTheme } from '@hooks';
import { captureException } from '@sentry/react-native';
import { getAssetMediaType } from '@src/etc/detect-media-type';
import { generateId } from '@src/etc/random';
import useQueueCycle from '@src/utils/hooks/useQueueCycle';
import { DynamicMediaProps } from '@src/utils/hooks/useUploadBulkMedia';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Asset } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import BigUploadMediaButton from './BigUploadMediaButton';
import Square from './Square';

interface EditEventMediaSectionProps {
	event: EventLink;
}

const EditEventMediaSection: React.FC<EditEventMediaSectionProps> = ({
	event
}) => {
	const { theme } = useTheme();
	const { urlForKey } = useImage();
	const dispatch = useDispatch();

	const getCurrentEventMediaAsDynamicMediaProps = (): DynamicMediaProps[] => {
		return _.orderBy(
			event.event.event_media.map((em) => ({
				id: em.event_media_uid,
				type: em.multimedia.media_type,
				uri: urlForKey(
					em.multimedia.media_type === MediaType.image
						? em.multimedia.image?.medium.key
						: em.multimedia.video?.media.key
				),
				state: 'success',
				eventMedia: em,
				order: em.order
			})),
			'order'
		);
	};

	// this is just an asshole blocker, i don't think we should
	// really set limits on the number of images/videos
	// people can upload, but idk yet...
	const maxSelectionLimit = 25;

	const { artist_uid } = useArtistAppContext();
	const { chooseMediaOrTakeNew } = usePhotosAndCamera();
	const [squares, setSquares] = useState<DynamicMediaProps[]>(
		getCurrentEventMediaAsDynamicMediaProps()
	);

	useEffect(() => {
		if (!_.isEqual(getCurrentEventMediaAsDynamicMediaProps(), squares)) {
			setSquares(getCurrentEventMediaAsDynamicMediaProps());
		}
	}, [event]);

	const [createEventMediaMutation] =
		eventMediaApiSlice.useCreateEventMediaMutation();
	const { addToQueue, numItems } = useQueueCycle({
		onComplete: () => {
			dispatch(
				eventMediaApiSlice.util.invalidateTags([
					{ type: 'ArtistEvent', id: event.event.event_uid },
					{ type: 'PublicEvent', id: event.event.event_uid }
				])
			);
		}
	});

	const onPressBulkUpload = async () => {
		// Open the camera roll
		const response = await chooseMediaOrTakeNew('mixed', {
			selectionLimit: maxSelectionLimit
		});

		// Extract the assets they selected
		const assets = response?.assets;
		if (!assets || assets.length === 0) {
			// Nothing selected, operation cancelled
			return;
		}

		// Build an array of the valid assets that were chosen
		let newSquares: DynamicMediaProps[] = [];
		for (let i = 0; i < assets.length; i++) {
			const asset = assets[i];
			const id = generateId();
			const type = getAssetMediaType(asset);
			if (!type) {
				// invalid asset type
				continue;
			}
			newSquares.push({
				id,
				state: 'loading',
				type,
				uri: asset.uri,
				asset,
				order: i
			});
		}

		// Set the valid assets into the state
		setSquares((prev) => [
			...newSquares,
			...prev.map((s) => ({
				...s,
				order: s.order + newSquares.length
			}))
		]);

		// Upload the assets synchronously
		const uploadPromises = newSquares.map(async (square) => {
			return new Promise<void>(async (resolve) => {
				createEventMediaMutation({
					params: {
						artist_uid,
						event_uid: event.event.event_uid
					},
					body: {
						mediaType: square.type,
						timestamp: square.asset?.timestamp
							? Formatting.toUtcIsoFormat(square.asset.timestamp)
							: undefined
					},
					file: square.asset as Asset // we know this is here, so we can cast it.
				})
					.unwrap()
					.then((response) => {
						setSquares((prev) =>
							prev.map((s) =>
								s.id === square.id
									? { ...s, state: 'success', eventMedia: response }
									: s
							)
						);
						resolve();
					})
					.catch((error) => {
						captureException(error);
						setSquares((prev) => prev.filter((s) => s.id !== square.id));
						Toast.show({
							text1: 'Error',
							text2: 'Error uploading media'
						});
						resolve();
					});
			});
		});

		addToQueue(uploadPromises);
	};

	return (
		<LView>
			<Section rowGap='m'>
				<LView>
					<Text variant='section-header-2' paddingHorizontal='m'>
						Media
					</Text>
				</LView>
				<LView>
					<FlatList
						horizontal
						showsHorizontalScrollIndicator={false}
						data={squares}
						keyExtractor={(item) => item.id}
						contentContainerStyle={{
							gap: theme.spacing.m,
							paddingHorizontal: theme.spacing.m
						}}
						renderItem={({ item }) => (
							<Square {...item} event_uid={event.event.event_uid} />
						)}
					/>
				</LView>
				<LView marginHorizontal='m'>
					<BigUploadMediaButton
						isEmpty={squares.length === 0}
						onPress={onPressBulkUpload}
						event_uid={event.event.event_uid}
					/>
				</LView>
			</Section>
		</LView>
	);
};

export default EditEventMediaSection;
