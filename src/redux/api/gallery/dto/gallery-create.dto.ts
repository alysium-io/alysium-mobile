import { ApiIdentifier } from '@types';
import { BaseGallery, GalleryRefType } from '../gallery.entity';

export interface CreateGalleryBodyDto {
	entity_type: GalleryRefType;
	entity_uid: ApiIdentifier;
	order: number;
}

export interface CreateGalleryResponseDto extends BaseGallery {}
