import { galleryApiSlice } from '@flux/api/gallery';
import { FindGalleryParamsDto } from '@flux/api/gallery/dto/gallery-find.dto';
import { GalleryItem as IGalleryItem } from '@flux/api/gallery/gallery-item.entity';
import { GalleryRefType } from '@flux/api/gallery/types';
import { useMultimedia, usePhotosAndCamera, useToast } from '@hooks';
import { getAssetMediaType } from '@src/etc/detect-media-type';
import useGallery from '@src/utils/hooks/useGallery';
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
	galleryRefType: GalleryRefType;
};

const EditableGalleryItem: React.FC<EditableGalleryItemProps> = ({
	galleryItem,
	index,
	galleryRefType,
	findGalleryParamsDto
}) => {
	const { chooseMediaOrTakeNew, extractAsset } = usePhotosAndCamera();
	const { toastError } = useToast();
	const dispatch = useDispatch();
	const { getImage } = useMultimedia();
	const [isPollingForThumbnail, setIsPollingForThumbnail] = useState(false);
	const [image, setImage] = useState(getImage(galleryItem?.multimedia));
	const gallery = useGallery(galleryRefType);
	const [createMutation] = gallery.create();
	const { data, fulfilledTimeStamp } = gallery.findItem(
		{
			params: {
				refType: galleryRefType,
				refId: findGalleryParamsDto.refId
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
							type: 'ArtistGallery',
							id: findGalleryParamsDto.refId
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
		const asset = extractAsset(media);

		if (asset) {
			const mediaType = getAssetMediaType(asset);
			if (!mediaType) {
				toastError('Invalid media type');
				return;
			}

			setIsPollingForThumbnail(true);

			createMutation({
				body: {
					mediaType,
					refType: galleryRefType,
					refId: findGalleryParamsDto.refId,
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
