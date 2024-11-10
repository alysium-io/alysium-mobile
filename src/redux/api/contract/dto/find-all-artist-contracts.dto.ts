import { Pagination } from '@flux/api/utils/pagination';
import { NanoId } from '@types';
import { Contract } from '../contract.entity';

export interface FindAllArtistContractsQueryDto extends Pagination {
	artist_uid: NanoId;
}

export interface FindAllArtistContractsResponseDto extends Contract {}
