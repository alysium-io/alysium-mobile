import { ApiIdentifier } from 'src/types';
import { Location } from '../location.entity';

export interface FindOneLocationParamsDto {
	location_id: ApiIdentifier;
}

export interface FindOneLocationResponseDto extends Location {}
