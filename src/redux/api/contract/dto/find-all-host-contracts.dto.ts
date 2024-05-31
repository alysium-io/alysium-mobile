import { ApiIdentifier } from '@types';
import { Contract } from '../contract.entity';

export interface FindAllHostContractsQueryDto {
	event_id: ApiIdentifier;
	page: number;
	limit: number;
}

export interface FindAllHostContractsResponseDto extends Contract {}
