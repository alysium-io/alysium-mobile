import { ApiIdentifier } from '@types';
import { Contract } from '../contract.entity';
import { UpdateContractBodyDto } from './update-contract.dto';

export interface CreateContractBodyDto extends UpdateContractBodyDto {
	host_uid: ApiIdentifier;
	artist_uid: ApiIdentifier;
	event_uid: ApiIdentifier;
}

export interface CreateContractResponseDto extends Contract {}
