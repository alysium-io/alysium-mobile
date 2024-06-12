import { ApiIdentifier } from '@types';
import { Contract } from '../contract.entity';

export interface DeleteContractBodyDto {
	event_uid: ApiIdentifier;
	artist_uid: ApiIdentifier;
}

export interface DeleteContractResponseDto extends Contract {}
