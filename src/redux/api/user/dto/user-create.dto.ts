import { PrivateUser } from '../user.entity';

export interface CreateUserBodyDto {
	name: string;
	email: string;
	password: string;
}

export interface CreateUserResponseDto extends PrivateUser {}
