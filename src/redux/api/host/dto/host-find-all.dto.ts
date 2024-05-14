import { Host } from '../host.entity';

export interface FindAllHostsQueryDto {
	page: number;
	limit: number;
}

export interface FindAllHostsResponseDto extends Host {}
