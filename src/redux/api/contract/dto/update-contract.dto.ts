import { ApiIdentifier } from '@types';
import { Contract } from '../contract.entity';

export interface UpdateContractParamsDto {
	contract_uid: ApiIdentifier;
}

export interface UpdateContractBodyDto {
	start_time: string | null;
	end_time: string | null;
	host_provides_equipment: boolean;
	additional_notes: string | null;
}

export interface UpdateContractResponseDto extends Contract {}
