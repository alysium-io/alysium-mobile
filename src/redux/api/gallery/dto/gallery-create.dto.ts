import { MediaType } from '@flux/api/media/types';
import { ApiIdentifier } from '@types';
import { Gallery } from '../gallery.entity';
import { GalleryRefType } from '../types';

export interface CreateGalleryBodyDto {
	readonly mediaType: MediaType;
	readonly refType: GalleryRefType;
	readonly refId: ApiIdentifier;
	readonly order: number;
}

export interface CreateGalleryResponseDto extends Gallery {}
