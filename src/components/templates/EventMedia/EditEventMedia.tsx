import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { generateId } from '@etc';
import { eventMediaApiSlice } from '@flux/api/event-media';
import { CreateEventMediaResponseDto } from '@flux/api/event-media/dto/event-media-create.dto';
import { EventMedia } from '@flux/api/event-media/event-media.entity';
import { MediaType } from '@flux/api/media/types';
import { usePhotosAndCamera } from '@hooks';
import { getAssetMediaType } from '@src/etc/detect-media-type';
import { Alert } from '@templates';
import { NanoId } from '@types';
import dayjs from 'dayjs';
import { orderBy } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { Case, Switch } from 'react-if';
import Toast from 'react-native-toast-message';
import AddItem from './components/AddItem';
import Container from './components/Container';
import ImageItem from './components/ImageItem';
import LoadingItem from './components/LoadingItem';
import VideoItem from './components/VideoItem';
import { CONFIG } from './constants';
import { SquareStateItem } from './types';
import useSpacing from './useSpacing';
interface EditEventMediaProps {
	event_media?: EventMedia[];
	event_uid: NanoId;
}

const EditEventMedia: React.FC<EditEventMediaProps> = ({
	event_media,
	event_uid
}) => {
	const { artist_uid } = useArtistAppContext();
	const { chooseMediaOrTakeNew, extractAsset } = usePhotosAndCamera();
	const { gap, squareWidth, onLayout } = useSpacing();
	const [createEventMediaMutation] =
		eventMediaApiSlice.useCreateEventMediaMutation();
	const [deleteEventMediaMutation] =
		eventMediaApiSlice.useDeleteEventMediaMutation();
	const [updateEventMediaMutation] =
		eventMediaApiSlice.useUpdateEventMediaMutation();
	const [squares, setSquares] = useState<SquareStateItem[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (squares === null && event_media) {
			setSquares(
				event_media.map((item) => ({
					type: item.multimedia.media_type,
					uri: item.multimedia.image?.small.key,
					id: generateId(),
					eventMedia: item,
					created_at: dayjs(item.created_at)
				}))
			);
		}
	}, [event_media]);

	const addSquares = async () => {
		if (squares === null) {
			Toast.show({
				text1: 'Error',
				text2: 'Squares not available'
			});
			return;
		}

		const selectionLimit = CONFIG.MAX_ITEMS - squares.length;
		const response = await chooseMediaOrTakeNew('mixed', {
			selectionLimit
		});
		const assets = response?.assets;
		if (!assets || assets.length === 0) {
			// Operation cancelled
			return;
		}

		const newSquares: {
			newSquare: SquareStateItem;
			promise: Promise<{ id: string; data?: CreateEventMediaResponseDto }>;
		}[] = assets.map((asset) => {
			const id = generateId();

			return {
				newSquare: {
					id,
					type: 'loading' as const,
					uri: asset.uri
				},
				promise: new Promise((resolve) => {
					const mediaType = getAssetMediaType(asset);
					if (!mediaType) {
						Toast.show({
							text1: 'Error',
							text2: 'Invalid media type'
						});
						return;
					}

					return createEventMediaMutation({
						params: {
							artist_uid,
							event_uid
						},
						body: {
							mediaType
						},
						file: asset
					}).then(({ data }) => {
						if (data) {
							resolve({ id, data });
						} else {
							Toast.show({
								text1: 'Error',
								text2: 'Failed to create event media'
							});
							resolve({ id });
						}
					});
				})
			};
		});

		const setData = [...squares, ...newSquares.map((s) => s.newSquare)];
		setSquares(setData);
		setIsLoading(true);

		const data = await Promise.all(newSquares.map((s) => s.promise));

		setSquares(
			setData.map((square) => {
				const newSquare = data.find((d) => d.id === square.id);
				return newSquare
					? {
							...square,
							eventMedia: newSquare.data,
							type:
								newSquare.data?.multimedia.media_type === MediaType.video
									? 'video'
									: 'image'
					  }
					: square;
			})
		);
		setIsLoading(false);
	};

	const replaceSquare = async (square: SquareStateItem) => {
		const event_media_uid = square.eventMedia?.event_media_uid;
		if (squares === null || !event_media_uid) {
			Toast.show({
				text1: 'Error',
				text2: 'Unable to update event media'
			});
			return;
		}

		const response = await chooseMediaOrTakeNew('mixed');
		const asset = extractAsset(response);
		if (!asset) {
			// Operation cancelled
			return;
		}

		const mediaType = getAssetMediaType(asset);
		if (!mediaType) {
			Toast.show({
				text1: 'Error',
				text2: 'Invalid media type'
			});
			return;
		}

		setSquares(
			squares.map((s) =>
				s.id === square.id ? { ...s, uri: asset.uri, type: 'loading' } : s
			)
		);
		setIsLoading(true);

		const { data } = await updateEventMediaMutation({
			params: { artist_uid, event_uid, event_media_uid },
			body: { mediaType },
			file: asset
		});
		setSquares(
			squares.map((s) =>
				s.id === square.id
					? { ...s, uri: asset.uri, type: 'image', eventMedia: data }
					: s
			)
		);
		setIsLoading(false);
	};

	const onPressDeleteEventMediaItem = async (square: SquareStateItem) => {
		const event_media_uid = square.eventMedia?.event_media_uid;
		if (!event_media_uid) {
			Toast.show({
				text1: 'Error',
				text2: 'Event media uid not available'
			});
			return;
		}

		if (squares === null) {
			Toast.show({
				text1: 'Error',
				text2: 'Squares not available'
			});
			return;
		}

		setSquares(squares.filter((s) => s.id !== square.id));
		deleteEventMediaMutation({
			params: {
				artist_uid,
				event_uid,
				event_media_uid
			}
		});
	};

	const onPressReplaceOrDelete = (square: SquareStateItem) => {
		Alert.alert(
			'Replace or delete?',
			'Do you want to replace or delete this image?',
			[
				{
					text: 'Replace',
					onPress: () => replaceSquare(square)
				},
				{
					text: 'Delete',
					style: 'destructive',
					onPress: () => onPressDeleteEventMediaItem(square)
				},
				{
					text: 'Cancel',
					style: 'cancel'
				}
			]
		);
	};

	const renderedSquares: SquareStateItem[] = useMemo(() => {
		if (squares === null) {
			return [];
		}

		const sortedSquares = orderBy(
			squares,
			[(s) => dayjs(s.created_at).valueOf()],
			['desc']
		);

		if (sortedSquares.length < 6 && !isLoading) {
			return [...sortedSquares, { type: 'add', id: generateId() }];
		}
		return sortedSquares;
	}, [squares, isLoading]);

	return (
		<View
			flexDirection='row'
			flexWrap='wrap'
			style={{ columnGap: gap, rowGap: gap }}
			onLayout={onLayout}
		>
			{renderedSquares.map((square, index) => (
				<Container key={index} squareWidth={squareWidth}>
					<Switch>
						<Case condition={square.type === 'loading'}>
							<LoadingItem uri={square.uri} />
						</Case>
						<Case condition={square.type === 'add'}>
							<AddItem onPress={addSquares} />
						</Case>
						<Case condition={square.type === 'image'}>
							<ImageItem
								disabled={isLoading}
								uri={square.uri}
								onPress={() => onPressReplaceOrDelete(square)}
							/>
						</Case>
						<Case condition={square.type === 'video'}>
							<VideoItem
								onPress={() => onPressReplaceOrDelete(square)}
								uri={square.eventMedia?.multimedia.video?.media.key}
							/>
						</Case>
					</Switch>
				</Container>
			))}
		</View>
	);
};

export default EditEventMedia;
