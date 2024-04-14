import { ApiIdentifier } from 'src/types';
import { Tag } from '../tag.entity';

export interface FindOneTagParamsDto {
	tag_id: ApiIdentifier;
}

export interface FindOneTagResponseDto extends Tag {}