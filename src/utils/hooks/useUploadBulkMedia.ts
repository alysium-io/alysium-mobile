import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { eventMediaApiSlice } from '@flux/api/event-media';
import { EventMedia } from '@flux/api/event-media/event-media.entity';
import { MediaType } from '@flux/api/media/types';
import { usePhotosAndCamera } from '@hooks';
import { captureException } from '@sentry/react-native';
import { getAssetMediaType } from '@src/etc/detect-media-type';
import { generateId } from '@src/etc/random';
import { NanoId } from '@types';
import { useState } from 'react';
import { Asset } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import useQueueCycle from './useQueueCycle';

export type DynamicMediaState = 'loading' | 'success' | 'error' | 'exists';

export type DynamicMediaProps = {
	/**
	 * The id of the square.
	 *
	 * This is important for when we perform async updates
	 * on each element as the promises return.
	 */
	id: string;

	/**
	 * This is the state of the square. We use this to distinguish
	 * between when the asset is either being uploaded, still loading,
	 * has successfully been uploaded, failed to be uploaded, or already
	 * exists in our api (i.e. it's already been uploaded).
	 *
	 * loading: The image is still loading.
	 * success: The image has been uploaded successfully.
	 * error: The image failed to upload.
	 * exists: The image already exists in the event media.
	 */
	state: DynamicMediaState;

	/**
	 * We separate the uri from the asset because depeding on the state,
	 * we might be getting a temporary uri from the file system, or
	 * the uri of the image that already exists in the event media. So it
	 * just depends on where we are at in the flow.
	 */
	uri?: string;

	/**
	 * This is the type of media that is being uploaded.
	 */
	type: MediaType;

	/**
	 * This is the order of the media in the event media list.
	 *
	 */
	order: number;

	/**
	 * This is the event media object that is being uploaded (or already exists).
	 */
	eventMedia?: EventMedia;

	/**
	 * If an error occurs in attempting to resolve the existing image, or
	 * uploading the image, this will be the error.
	 */
	error?: any;

	/**
	 * This will only be available if the image is added
	 * while the user is on this page. It gets added as the interim
	 * between the image being picked, and the image being uploaded.
	 * So it will not be here if the media already exists and we're
	 * just loading it from the api.
	 */
	asset?: Asset;
};

interface IUseUploadBulkEventMedia {
	squares: DynamicMediaProps[];
	onPressBulkUpload: () => Promise<void>;
	isEmpty: boolean;
	clear: () => void;
	numSquaresLoading: number;
}

const useUploadBulkEventMedia = (
	event_uid: NanoId,
	initialSquares: DynamicMediaProps[]
): IUseUploadBulkEventMedia => {
	// this is just an asshole blocker, i don't think we should
	// really set limits on the number of images/videos
	// people can upload, but idk yet...
	const maxSelectionLimit = 25;

	const { artist_uid } = useArtistAppContext();
	const { chooseMediaOrTakeNew } = usePhotosAndCamera();
	const [squares, setSquares] = useState<DynamicMediaProps[]>(initialSquares);
	const [createEventMediaMutation] =
		eventMediaApiSlice.useCreateEventMediaMutation();
	const { addToQueue, numItems } = useQueueCycle();

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
						event_uid
					},
					body: {
						mediaType: square.type
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

	return {
		squares,
		onPressBulkUpload,
		isEmpty: squares.length === 0,
		clear: () => setSquares([]),
		numSquaresLoading: numItems
	};
};

export default useUploadBulkEventMedia;
