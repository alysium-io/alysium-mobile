import { Pagination } from '@flux/api/utils/pagination';
import { ApiIdentifier } from '@types';
import { Contract } from '../contract.entity';

export interface FindAllArtistContractsQueryDto extends Pagination {
	artist_uid: ApiIdentifier;
}

export interface FindAllArtistContractsResponseDto extends Contract {}
