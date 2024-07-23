import { SearchResponseDto } from '../search.entity';

export interface SearchTagsBodyDto {
	q: string;
}

export interface SearchTagsResponseDto extends SearchResponseDto {}
