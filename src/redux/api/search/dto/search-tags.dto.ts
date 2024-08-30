import { Pagination } from '@flux/api/utils/pagination';
import { ApiIdentifier } from '@types';
import { SearchResponseDto, TagSearchItem } from '../search.entity';

export interface SearchTagsQueryDto extends Pagination {}

export interface SearchTagsBodyDto {
	readonly q: string;
	readonly correlated_tag_uids?: ApiIdentifier[];
	readonly sort?: string[];
}

export interface SearchTagsResponseDto
	extends SearchResponseDto<TagSearchItem> {}
