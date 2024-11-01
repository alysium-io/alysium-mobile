import { ApiIdentifier } from '@types';
import { Gallery } from '../gallery.entity';

export interface FindGalleryParamsDto {
	readonly refId: ApiIdentifier;
}

export interface FindGalleryResponseDto extends Gallery {}
