import { FindGalleryResponseDto } from '@flux/api/gallery/dto/gallery-find.dto';
import { useGallery } from '@hooks';
import { useRoute } from '@react-navigation/native';
import { ScrollReel } from '@src/components/organisms/ScrollReel';
import { ViewGalleryPageRouteProp } from '@types';
import _ from 'lodash';
import React from 'react';

function reorderFromIndex(
	array: FindGalleryResponseDto | undefined,
	startOrder: number
): FindGalleryResponseDto | undefined {
	if (!array || array.items.length === 0) return undefined;

	// Find the maximum order value
	const maxOrder = _.maxBy(array.items, 'order')?.order;
	if (!maxOrder) return undefined;

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
	const orderedItems = _.sortBy(array.items, (obj) => getNewIndex(obj.order));

	return {
		...array,
		items: orderedItems
	};
}

const ViewGalleryPage = () => {
	const route = useRoute<ViewGalleryPageRouteProp>();
	const { transitionTagId, pressIndex, findGalleryParamsDto, galleryRefType } =
		route.params;

	const gallery = useGallery(galleryRefType);
	const { data } = gallery.find({
		params: findGalleryParamsDto
	});

	return (
		<ScrollReel
			transitionTagId={transitionTagId}
			data={reorderFromIndex(data, pressIndex)}
		/>
	);
};

export default ViewGalleryPage;
