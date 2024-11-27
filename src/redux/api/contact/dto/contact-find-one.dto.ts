import { NanoId } from '@types';
import { Contact } from '../contact.entity';

export interface FindOneContactParamsDto {
	contact_uid: NanoId;
	artist_uid: NanoId;
}

export interface FindOneContactResponseDto extends Contact {}
