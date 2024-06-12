import { ApiIdentifier } from '@types';
import { User } from '../user.entity';

export interface FindOneUserParamsDto {
	user_uid: ApiIdentifier;
}

export interface FindOneUserResponseDto extends User {}
