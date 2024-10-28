import { MediaRefType } from '@flux/api/media/types';
import { ApiIdentifier } from '@types';
import { Gallery } from '../gallery.entity';

export interface FindGalleryParamsDto {
	readonly refType: MediaRefType;
	readonly refId: ApiIdentifier;
}

export interface FindGalleryResponseDto extends Gallery {}
