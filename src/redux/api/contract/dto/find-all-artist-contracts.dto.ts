import { ApiIdentifier } from '@types';
import { Contract } from '../contract.entity';

export interface FindAllArtistContractsQueryDto {
	artist_uid: ApiIdentifier;
	page: number;
	limit: number;
}

export interface FindAllArtistContractsResponseDto extends Contract {}
