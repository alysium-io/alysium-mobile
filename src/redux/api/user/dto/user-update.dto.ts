import { ApiIdentifier } from '@types';
import { PrivateUser } from '../user.entity';

export interface UpdateUserBodyDto {
	user_uid: ApiIdentifier;
	handle: string;
	name?: string;
	email?: string;
}

export interface UpdateUserResponseDto extends PrivateUser {}
