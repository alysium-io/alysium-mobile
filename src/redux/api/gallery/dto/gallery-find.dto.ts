import { NanoId } from '@types';
import { Gallery } from '../gallery.entity';

export interface FindGalleryParamsDto {
	readonly refId: NanoId;
}

export interface FindGalleryResponseDto extends Gallery {}
