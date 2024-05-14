import { Tag } from '../tag.entity';

export interface CreateTagBodyDto {
	name: string;
}

export interface CreateTagResponseDto extends Tag {}
