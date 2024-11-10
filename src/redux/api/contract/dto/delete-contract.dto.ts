import { NanoId } from '@types';
import { Contract } from '../contract.entity';

export interface DeleteContractBodyDto {
	event_uid: NanoId;
	artist_uid: NanoId;
}

export interface DeleteContractResponseDto extends Contract {}
