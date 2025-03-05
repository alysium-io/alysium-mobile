import { NanoId } from '@types';
import { PrivateArtist } from '../artist/artist.entity';
import { ProfileImage } from '../profile-image';

export enum Role {
	guest = 'guest',
	user = 'user',
	admin = 'admin'
}

export interface User {
	readonly user_uid: NanoId;
	readonly name: string | null;
	readonly handle: string;
	readonly email: string | null;
	readonly phone_number: string | null;
	readonly profile_image: ProfileImage | null;
	readonly artists: PrivateArtist[];
	readonly num_artists_following: number;
	readonly num_scenes_following: number;
	readonly role: Role;
	readonly has_accepted_terms: boolean;
}

export interface PrivateUser extends User {}
export interface PublicUser extends User {}
