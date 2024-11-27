import { NanoId } from '@types';
import { Contact } from '../contact.entity';

export interface UpdateContactParamsDto {
	readonly contact_uid: NanoId;
	readonly artist_uid: NanoId;
}

export interface UpdateContactBodyDto {
	readonly name: string;
	readonly role?: string | null;
	readonly phone_number?: string | null;
	readonly email?: string | null;
}

export interface UpdateContactResponseDto extends Contact {}
