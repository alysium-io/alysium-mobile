import { ApiIdentifier } from '@types';
import { Location } from '../location.entity';

export interface FindOneLocationParamsDto {
	location_id: ApiIdentifier;
}

export interface FindOneLocationResponseDto extends Location {}
