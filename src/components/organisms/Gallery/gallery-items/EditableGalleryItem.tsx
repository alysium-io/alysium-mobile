import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { galleryApiSlice } from '@flux/api/gallery';
import { FindGalleryParamsDto } from '@flux/api/gallery/dto/gallery-find.dto';
import { GalleryItem as IGalleryItem } from '@flux/api/gallery/gallery-item.entity';
import { MediaRefType } from '@flux/api/media/types';
import { useMultimedia, usePhotosAndCamera, useToast } from '@hooks';
import { getAssetMediaType } from '@src/etc/detect-media-type';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GalleryItemContainer from '../components/GalleryItemContainer';
import GalleryItemEditOverlay from '../overlays/GalleryItemEditOverlay';
import GalleryItemLoadingOverlay from '../overlays/GalleryItemLoadingOverlay';
import GalleryItemThumbnailOverlay from '../overlays/GalleryItemThumbnailOverlay';

type EditableGalleryItemProps = {
	galleryItem?: IGalleryItem | null;
	index: number;
	findGalleryParamsDto: FindGalleryParamsDto;
};

const EditableGalleryItem: React.FC<EditableGalleryItemProps> = ({
	galleryItem,
	index
}) => {
	const { chooseMediaOrTakeNew } = usePhotosAndCamera();
	const { toastError } = useToast();
	const { artistData } = useArtistAppContext();
	const dispatch = useDispatch();
	const [createGalleryItemMutation] =
		galleryApiSlice.useCreateGalleryItemMutation();
	const { getImage } = useMultimedia();
	const [isPollingForThumbnail, setIsPollingForThumbnail] = useState(false);
	const [image, setImage] = useState(getImage(galleryItem?.multimedia));
	const { data, fulfilledTimeStamp } = galleryApiSlice.useFindGalleryItemQuery(
		{
			params: {
				refType: MediaRefType.artist,
				refId: artistData.artist_uid
			},
			query: {
				order: index
			}
		},
		{
			skip: !isPollingForThumbnail,
			pollingInterval: 1000
		}
	);

	useEffect(() => {
		if (isPollingForThumbnail) {
			const newImage = getImage(data?.multimedia);
			if (!_.isEqual(image, newImage) && newImage) {
				dispatch(
					galleryApiSlice.util.invalidateTags([
						{
							type: 'Gallery',
							id: [artistData.artist_uid, MediaRefType.artist].join('/')
						}
					])
				);
				setImage(newImage);
				setIsPollingForThumbnail(false);
			}
		}
	}, [fulfilledTimeStamp]);

	const onPress = async () => {
		const media = await chooseMediaOrTakeNew();
		const asset = media?.assets?.[0];

		if (asset) {
			const mediaType = getAssetMediaType(asset);
			if (!mediaType) {
				toastError('Invalid media type');
				return;
			}

			setIsPollingForThumbnail(true);

			createGalleryItemMutation({
				body: {
					mediaType,
					refType: MediaRefType.artist,
					refId: artistData.artist_uid,
					order: index
				},
				file: asset
			}).catch(() => {
				if (isPollingForThumbnail) {
					console.log('Error that should set it back');
					setIsPollingForThumbnail(false);
				}
			});
		}
	};

	if (isPollingForThumbnail) {
		return (
			<GalleryItemContainer>
				<GalleryItemLoadingOverlay />
			</GalleryItemContainer>
		);
	}

	return (
		<GalleryItemContainer onPress={onPress}>
			<GalleryItemThumbnailOverlay image={image} />
			<GalleryItemEditOverlay />
		</GalleryItemContainer>
	);
};

export default EditableGalleryItem;
