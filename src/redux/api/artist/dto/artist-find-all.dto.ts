import { Pagination } from '@flux/api/utils/pagination';
import { PrivateArtist } from '../artist.entity';

export interface PrivateFindAllArtistsQueryDto extends Pagination {}

export interface PrivateFindAllArtistsResponseDto extends PrivateArtist {}
