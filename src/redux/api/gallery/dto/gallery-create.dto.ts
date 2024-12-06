import { MediaType } from '@flux/api/media/types';
import { NanoId } from '@types';
import { Gallery } from '../gallery.entity';
import { GalleryRefType } from '../types';

export interface CreateGalleryItemBodyDto {
	readonly mediaType: MediaType;
	readonly refType: GalleryRefType;
	readonly refId: NanoId;
	readonly order: number;
}

export interface CreateGalleryItemResponseDto extends Gallery {}
