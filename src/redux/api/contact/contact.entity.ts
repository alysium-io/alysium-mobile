import { NanoId } from '@types';

export interface Contact {
	readonly contact_uid: NanoId;
	readonly name: string;
	readonly role?: string | null;
	readonly phone_number?: string | null;
	readonly email?: string | null;
}
