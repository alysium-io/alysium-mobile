import { Pagination } from '@flux/api/utils/pagination';
import { ArtistSearchItem, SearchResponseDto } from '../search.entity';

export interface SearchArtistsQueryDto extends Pagination {}

export interface SearchArtistsBodyDto {
	q: string;
}

export interface SearchArtistsResponseDto
	extends SearchResponseDto<ArtistSearchItem> {}
