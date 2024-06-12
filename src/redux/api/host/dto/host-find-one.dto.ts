import { ApiIdentifier } from '@types';
import { Host } from '../host.entity';

export interface FindOneHostParamsDto {
	host_uid: ApiIdentifier;
}

export interface FindOneHostResponseDto extends Host {}
