import { NanoId } from '@types';
import { Tag } from '../tag.entity';

export interface FindOneTagParamsDto {
	tag_uid: NanoId;
}

export interface FindOneTagResponseDto extends Tag {}
