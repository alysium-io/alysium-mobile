import { ApiIdentifier } from 'src/types';
import { HostEvent } from '../host-event.entity';

export interface DeleteHostEventBodyDto {
	host_id: ApiIdentifier;
	event_id: ApiIdentifier;
}

export interface DeleteHostEventResponseDto extends HostEvent {}
