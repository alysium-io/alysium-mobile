import { ApiIdentifier } from '@types';
import { Host } from '../host.entity';

export interface DeleteHostParamsDto {
	host_uid: ApiIdentifier;
}

export interface DeleteHostResponseDto extends Host {}
