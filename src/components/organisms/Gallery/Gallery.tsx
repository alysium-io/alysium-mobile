import { DynamicGrid } from '@atomic';
import { generateId } from '@etc';
import { GalleryItem } from '@flux/api/gallery/gallery-item.entity';
import { Gallery as IGallery } from '@flux/api/gallery/gallery.entity';
import { useMultimedia, useNavigation } from '@hooks';
import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import GalleryItemContainer from './components/GalleryItemContainer';
import GalleryItemThumbnailOverlay from './overlays/GalleryItemThumbnailOverlay';

const reorderFromIndex = (
	array: GalleryItem[] | undefined,
	startOrder: number
): GalleryItem[] | undefined => {
	if (!array || array.length === 0) return undefined;

	// Find the maximum order value
	const maxOrder = _.maxBy(array, 'order')?.order;
	if (maxOrder === undefined) return undefined;

	// Create a function to get the new index for each item
	const getNewIndex = (currentOrder: number) => {
		// Calculate how many positions we need to move from the startOrder
		const distance =
			currentOrder >= startOrder
				? currentOrder - startOrder // If current order is >= startOrder, simple subtraction
				: maxOrder + 1 - startOrder + currentOrder; // If we need to wrap around
		return distance;
	};

	// Sort the array based on the new indices
	const orderedItems = _.sortBy(array, (obj) => getNewIndex(obj.order));
	return orderedItems;
};

interface GalleryProps {
	gallery: IGallery | null;
}

const Gallery: React.FC<GalleryProps> = ({ gallery }) => {
	const { getImage } = useMultimedia();
	const { viewGalleryPage } = useNavigation();

	const GridItem = useCallback(
		({ item }: { item: GalleryItem }) => {
			const transitionTagId = useMemo(() => generateId(10), []);
			return (
				<GalleryItemContainer
					onPress={() => {
						viewGalleryPage(
							transitionTagId,
							reorderFromIndex(gallery?.items, item.order) ?? []
						);
					}}
				>
					<GalleryItemThumbnailOverlay
						image={getImage(item?.multimedia)}
						sharedTransitionTag={transitionTagId}
					/>
				</GalleryItemContainer>
			);
		},
		[gallery, getImage, viewGalleryPage]
	);

	return <DynamicGrid data={gallery?.items ?? []} renderItem={GridItem} />;
};

export default Gallery;
