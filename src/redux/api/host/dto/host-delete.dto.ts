import { NanoId } from '@types';
import { Host } from '../host.entity';

export interface DeleteHostParamsDto {
	host_uid: NanoId;
}

export interface DeleteHostResponseDto extends Host {}
