import { EventLink } from '@flux/api/event-link/event-link.entity';
import { NanoId } from '@types';
import { PrimitiveArtistEventParamsDto } from './params';

export interface CreateArtistEventParamsDto
	extends PrimitiveArtistEventParamsDto {}

export interface CreateArtistEventBodyDto {
	host_uid: NanoId;
	name: string;
}

export interface CreateArtistEventResponseDto extends EventLink {}
