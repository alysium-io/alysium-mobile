import { ApiIdentifier } from 'src/types';
import { User } from '../user.entity';

export interface UpdateUserBodyDto {
	user_id: ApiIdentifier;
	name: string;
	email: string;
}

export interface UpdateUserResponseDto extends User {}
