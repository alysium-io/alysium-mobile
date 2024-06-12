import { ApiIdentifier } from '@types';
import { Tag } from '../tag.entity';

export interface FindOneTagParamsDto {
	tag_uid: ApiIdentifier;
}

export interface FindOneTagResponseDto extends Tag {}
