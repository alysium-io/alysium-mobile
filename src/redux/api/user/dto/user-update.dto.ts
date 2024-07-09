import { ApiIdentifier } from '@types';
import { User } from '../user.entity';

export interface UpdateUserBodyDto {
	user_uid: ApiIdentifier;
	handle: string;
	name?: string;
	email?: string;
}

export interface UpdateUserResponseDto extends User {}
