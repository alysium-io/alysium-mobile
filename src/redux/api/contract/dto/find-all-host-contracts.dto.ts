import { NanoId } from '@types';
import { Contract } from '../contract.entity';

export interface FindAllHostContractsQueryDto {
	event_uid: NanoId;
	page: number;
	limit: number;
}

export interface FindAllHostContractsResponseDto extends Contract {}
