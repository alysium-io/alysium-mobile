import { FindGalleryParamsDto } from '@flux/api/gallery/dto/gallery-find.dto';
import { GalleryItem } from '@flux/api/gallery/gallery-item.entity';
import { GalleryRefType } from '@flux/api/gallery/types';
import { GALLERY_LENGTH, GALLERY_ROW_LENGTH } from './settings';

export interface GalleryProps {
	findGalleryParamsDto: FindGalleryParamsDto;
	galleryRefType: GalleryRefType;
}

export type GalleryItemData = {
	rowIndex: number;
	columnIndex: number;
	galleryItem: GalleryItem | null;
	galleryItemIndex: number | null;
	orderIndex: number;
};

export type GalleryColumn = GalleryItemData[];
export type GalleryRows = GalleryColumn[];

export const createGallerymap = (
	galleryItems: GalleryItem[] | undefined
): GalleryRows | undefined => {
	/**
	 * The purpose of this function is to organize the 2d matrix that is
	 * the gallery, by providing the correct gallery items into the correct
	 * matrix slot by using the `order` property.
	 *
	 * Example output:
	 * 	[
	 * 		[
	 * 			{ rowIndex: 0, columnIndex: 0, galleryItem: { ... }, galleryItemIndex: 0, orderIndex: 0 },
	 * 			{ rowIndex: 0, columnIndex: 1, galleryItem: { ... }, galleryItemIndex: 2, orderIndex: 1 },
	 * 			{ rowIndex: 0, columnIndex: 2, galleryItem: null, galleryItemIndex: null, orderIndex: 2 }
	 * 		],
	 * 		[
	 * 			{ rowIndex: 1, columnIndex: 0, galleryItem: null, galleryItemIndex: null, orderIndex: 3 },
	 * 			{ rowIndex: 1, columnIndex: 1, galleryItem: { ... }, galleryItemIndex: 5, orderIndex: 4 },
	 * 			{ rowIndex: 1, columnIndex: 2, galleryItem: null, galleryItemIndex: null, orderIndex: 5 }
	 * 		]
	 *  ]
	 */
	if (!galleryItems) {
		return [];
	}

	let rows: GalleryRows = [];
	let orderIndex: number = 0;
	for (
		let rowIndex = 0;
		rowIndex < GALLERY_LENGTH / GALLERY_ROW_LENGTH;
		rowIndex++
	) {
		const column: GalleryColumn = [];
		for (let columnIndex = 0; columnIndex < GALLERY_ROW_LENGTH; columnIndex++) {
			const galleryItemIndex = galleryItems.findIndex(
				(item) => item.order === orderIndex
			);
			const galleryItem =
				galleryItemIndex === -1 ? null : galleryItems[galleryItemIndex];

			const galleryItemData: GalleryItemData = {
				rowIndex,
				columnIndex,
				galleryItem,
				galleryItemIndex,
				orderIndex
			};
			column.push(galleryItemData);

			orderIndex++;
		}
		rows.push(column);
	}

	return rows;
};
