import { ApiIdentifier } from '@types';
import { Contract } from '../contract.entity';

export interface DeleteContractBodyDto {
	event_id: ApiIdentifier;
	artist_id: ApiIdentifier;
}

export interface DeleteContractResponseDto extends Contract {}
