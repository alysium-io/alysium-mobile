import { ApiIdentifier } from '@types';
import { Contract } from '../contract.entity';

export interface CreateContractBodyDto {
	host_id: ApiIdentifier;
	artist_id: ApiIdentifier;
	event_id: ApiIdentifier;
}

export interface CreateContractResponseDto extends Contract {}
