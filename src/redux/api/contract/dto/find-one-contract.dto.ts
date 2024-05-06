import { ApiIdentifier } from '@types';
import { Contract } from '../contract.entity';

export interface FindOneContractParamsDto {
	contract_id: ApiIdentifier;
}

export interface FindOneContractResponseDto extends Contract {}
