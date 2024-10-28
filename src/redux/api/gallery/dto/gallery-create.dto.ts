import { MediaRefType, MediaType } from '@flux/api/media/types';
import { ApiIdentifier } from '@types';
import { Gallery } from '../gallery.entity';

export interface CreateGalleryBodyDto {
	readonly mediaType: MediaType;
	readonly refType: MediaRefType;
	readonly refId: ApiIdentifier;
	readonly order: number;
}

export interface CreateGalleryResponseDto extends Gallery {}
