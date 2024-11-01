import { GalleryItem } from './gallery-item.entity';
import { GalleryRefType } from './types';

export interface Gallery {
	readonly ref_type: GalleryRefType;
	readonly items: GalleryItem[];
}
