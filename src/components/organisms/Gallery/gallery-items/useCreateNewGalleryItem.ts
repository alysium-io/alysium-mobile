import { GalleryRefType } from '@flux/api/gallery/types';
import { useGallery, usePhotosAndCamera, useToast } from '@hooks';
import { getAssetMediaType } from '@src/etc/detect-media-type';
import { NanoId } from '@types';
import { Alert } from 'react-native';

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
	const { toastError } = useToast();
	const gallery = useGallery(galleryRefType);
	const [createGalleryItemMutation] = gallery.create();
	const [deleteGalleryItemMutation] = gallery.delete();

	const onPressCreateNewGalleryItem = async () => {
		const media = await chooseMediaOrTakeNew('photo');
		const asset = extractAsset(media);

		if (asset) {
			const mediaType = getAssetMediaType(asset);
			if (!mediaType) {
				toastError('Invalid media type');
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
