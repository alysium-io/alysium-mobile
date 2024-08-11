import { Pagination } from '@flux/api/utils/pagination';
import { SearchResponseDto } from '../search.entity';

export interface SearchTagsQueryDto extends Pagination {}

export interface SearchTagsBodyDto {
	q: string;
}

export interface SearchTagsResponseDto extends SearchResponseDto {}
