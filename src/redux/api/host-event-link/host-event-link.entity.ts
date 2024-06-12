import { ApiIdentifier } from '@types';
import { Event } from '../event/event.entity';
import { Host } from '../host/host.entity';

export interface HostEventLink {
	event_uid: ApiIdentifier;
	host_uid: ApiIdentifier;
	event: Event;
	host: Host;
}
