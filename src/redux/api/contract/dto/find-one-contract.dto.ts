import { NanoId } from '@types';
import { Contract } from '../contract.entity';

export interface FindOneContractParamsDto {
	contract_uid: NanoId;
}

export interface FindOneContractResponseDto extends Contract {}
