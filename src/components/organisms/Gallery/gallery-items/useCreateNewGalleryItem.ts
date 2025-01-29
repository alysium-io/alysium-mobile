import { GalleryRefType } from '@flux/api/gallery/types';
import { useGallery, usePhotosAndCamera } from '@hooks';
import { getAssetMediaType } from '@src/etc/detect-media-type';
import { Alert } from '@templates';
import { NanoId } from '@types';
import Toast from 'react-native-toast-message';

interface IUseCreateNewGalleryItem {
	onPressCreateNewGalleryItem: () => void;
	onPressReplaceOrDelete: () => void;
}

const useCreateNewGalleryItem = (
	galleryRefType: GalleryRefType,
	galleryRefUid: NanoId,
	order: number
): IUseCreateNewGalleryItem => {
	const { chooseMediaOrTakeNew, extractAsset } = usePhotosAndCamera();
	const gallery = useGallery(galleryRefType);
	const [createGalleryItemMutation] = gallery.create();
	const [deleteGalleryItemMutation] = gallery.delete();

	const onPressCreateNewGalleryItem = async () => {
		const media = await chooseMediaOrTakeNew('photo');
		const asset = extractAsset(media);

		if (asset) {
			const mediaType = getAssetMediaType(asset);
			if (!mediaType) {
				Toast.show({
					text1: 'Error',
					text2: 'Invalid media type'
				});
				return;
			}

			createGalleryItemMutation({
				body: {
					mediaType,
					refType: galleryRefType,
					refId: galleryRefUid,
					order
				},
				file: asset
			});
		}
	};

	const onPressDeleteGalleryItem = async () => {
		deleteGalleryItemMutation({
			body: {
				refType: galleryRefType,
				refId: galleryRefUid,
				order
			}
		});
	};

	const onPressReplaceOrDelete = () => {
		Alert.alert(
			'Replace or delete?',
			'Do you want to replace or delete this image?',
			[
				{
					text: 'Replace',
					onPress: onPressCreateNewGalleryItem
				},
				{
					text: 'Delete',
					style: 'destructive',
					onPress: onPressDeleteGalleryItem
				},
				{
					text: 'Cancel',
					style: 'cancel'
				}
			]
		);
	};

	return {
		onPressCreateNewGalleryItem,
		onPressReplaceOrDelete
	};
};

export default useCreateNewGalleryItem;
