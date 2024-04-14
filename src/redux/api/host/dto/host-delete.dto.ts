import { ApiIdentifier } from 'src/types';
import { Host } from '../host.entity';

export interface DeleteHostParamsDto {
	host_id: ApiIdentifier;
}

export interface DeleteHostResponseDto extends Host {}
