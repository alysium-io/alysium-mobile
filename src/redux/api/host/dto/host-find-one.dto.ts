import { ApiIdentifier } from 'src/types';
import { Host } from '../host.entity';

export interface FindOneHostParamsDto {
	host_id: ApiIdentifier;
}

export interface FindOneHostResponseDto extends Host {}
