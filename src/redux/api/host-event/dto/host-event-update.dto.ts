import { ApiIdentifier } from 'src/types';
import { HostEvent } from '../host-event.entity';

export interface UpdateHostEventParamsDto {
	host_event_id: ApiIdentifier;
}

export interface UpdateHostEventResponseDto extends HostEvent {}
