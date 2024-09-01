import { PrivateUser } from '../user.entity';

export interface UpdateUserBodyDto {
	handle: string;
	name: string | null;
	email: string | null;
}

export interface UpdateUserResponseDto extends PrivateUser {}
