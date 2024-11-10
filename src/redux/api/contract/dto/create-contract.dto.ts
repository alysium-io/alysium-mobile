import { NanoId } from '@types';
import { Contract } from '../contract.entity';
import { UpdateContractBodyDto } from './update-contract.dto';

export interface CreateContractBodyDto extends UpdateContractBodyDto {
	host_uid: NanoId;
	artist_uid: NanoId;
	event_uid: NanoId;
}

export interface CreateContractResponseDto extends Contract {}
