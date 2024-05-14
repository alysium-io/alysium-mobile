import { ApiIdentifier } from '@types';
import { Contract } from '../contract.entity';
import { UpdateContractBodyDto } from './update-contract.dto';

export interface CreateContractBodyDto extends UpdateContractBodyDto {
	host_id: ApiIdentifier;
	artist_id: ApiIdentifier;
	event_id: ApiIdentifier;
}

export interface CreateContractResponseDto extends Contract {}
