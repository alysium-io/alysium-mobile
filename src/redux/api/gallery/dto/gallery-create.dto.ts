import { ApiIdentifier } from 'src/types';
import { BaseGallery, GalleryRefType } from '../gallery.entity';

export interface CreateGalleryBodyDto {
	entity_type: GalleryRefType;
	entity_id: ApiIdentifier;
	order: number;
}

export interface CreateGalleryResponseDto extends BaseGallery {}
