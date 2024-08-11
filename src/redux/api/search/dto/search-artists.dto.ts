import { Pagination } from '@flux/api/utils/pagination';
import { SearchResponseDto } from '../search.entity';

export interface SearchArtistsQueryDto extends Pagination {}

export interface SearchArtistsBodyDto {
	q: string;
}

export interface SearchArtistsResponseDto extends SearchResponseDto {}
