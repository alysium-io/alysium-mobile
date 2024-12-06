import { NanoId } from '@types';
import { GalleryItem } from '../gallery-item.entity';
import { GalleryRefType } from '../types';

export interface DeleteGalleryItemBodyDto {
	readonly refType: GalleryRefType;
	readonly refId: NanoId;
	readonly order: number;
}

export interface DeleteGalleryItemResponseDto extends GalleryItem {}
