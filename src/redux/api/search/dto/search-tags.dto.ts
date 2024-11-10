import { Pagination } from '@flux/api/utils/pagination';
import { NanoId } from '@types';
import { SearchResponseDto, TagSearchItem } from '../search.entity';

export interface SearchTagsQueryDto extends Pagination {}

export interface SearchTagsBodyDto {
	readonly q: string;
	readonly correlated_tag_uids?: NanoId[];
	readonly sort?: string[];
}

export interface SearchTagsResponseDto
	extends SearchResponseDto<TagSearchItem> {}
