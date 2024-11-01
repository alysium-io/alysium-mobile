import { Event } from '../event/event.entity';
import { EventLinkPermissions, EventLinkRefType } from './types';

export interface EventLink {
	readonly permissions: EventLinkPermissions;
	readonly ref_type: EventLinkRefType;
	readonly event: Event;
}
