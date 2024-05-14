import { Host } from '../host.entity';

export interface CreateHostBodyDto {
	name: string;
}

export interface CreateHostResponseDto extends Host {}
