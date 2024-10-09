import { Tag } from '../tag.entity';

export interface DiscoverTagsQueryDto {
	limit?: number;
}

export interface DiscoverTagsResponseDto extends Array<Tag> {}
