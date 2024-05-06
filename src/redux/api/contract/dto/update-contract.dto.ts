import { ApiIdentifier } from '@types';
import { Contract } from '../contract.entity';

export interface UpdateContractParamsDto {
	contract_id: ApiIdentifier;
}

export interface UpdateContractBodyDto {
	contract_id: ApiIdentifier;
	host_provides_equipment: boolean;
}

export interface UpdateContractResponseDto extends Contract {}
