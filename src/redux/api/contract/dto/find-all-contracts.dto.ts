import { ApiIdentifier } from '@types';
import { Contract } from '../contract.entity';

export interface FindAllContractsQueryDto {
	event_id: ApiIdentifier;
	page: number;
	limit: number;
}

export interface FindAllContractsResponseDto extends Contract {}
