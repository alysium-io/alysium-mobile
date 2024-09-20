import { PrivateUser } from '../user.entity';

export interface UpdateUserBodyDto {
	handle: string;
}

export interface UpdateUserResponseDto extends PrivateUser {}
