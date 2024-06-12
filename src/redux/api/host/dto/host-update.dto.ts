import { ApiIdentifier } from '@types';
import { Host } from '../host.entity';

export interface UpdateHostParamsDto {
	host_uid: ApiIdentifier;
}

export interface UpdateHostBodyDto {
	name: string;
	phone_number: string;
	company_name: string;
}

export interface UpdateHostResponseDto extends Host {}
