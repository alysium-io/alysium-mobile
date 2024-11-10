import { NanoId } from '@types';
import { GalleryItem } from '../gallery-item.entity';
import { GalleryRefType } from '../types';

export interface FindGalleryItemParamsDto {
	readonly refType: GalleryRefType;
	readonly refId: NanoId;
}

export interface FindGalleryItemQueryDto {
	readonly order: number;
}

export interface FindGalleryItemResponseDto extends GalleryItem {}
