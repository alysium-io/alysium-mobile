import { MediaRefType } from '@flux/api/media/types';
import { ApiIdentifier } from '@types';
import { GalleryItem } from '../gallery-item.entity';

export interface FindGalleryItemParamsDto {
	readonly refType: MediaRefType;
	readonly refId: ApiIdentifier;
}

export interface FindGalleryItemQueryDto {
	readonly order: number;
}

export interface FindGalleryItemResponseDto extends GalleryItem {}
