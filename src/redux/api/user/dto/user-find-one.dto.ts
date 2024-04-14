import { ApiIdentifier } from 'src/types';
import { User } from '../user.entity';

export interface FindOneUserParamsDto {
	user_id: ApiIdentifier;
}

export interface FindOneUserResponseDto extends User {}
