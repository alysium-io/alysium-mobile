import { ApiIdentifier } from '@types';
import { HostEvent } from '../host-event.entity';

export interface FindOneHostEventParamsDto {
	host_event_id: ApiIdentifier;
}

export interface FindOneHostEventResponseDto extends HostEvent {}
