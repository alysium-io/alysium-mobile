import { ApiIdentifier } from 'src/types';
import { HostEvent } from '../host-event.entity';

export interface CreateHostEventBodyDto {
	event_id: ApiIdentifier;
	host_id: ApiIdentifier;
}

export interface CreateHostEventResponseDto extends HostEvent {}
