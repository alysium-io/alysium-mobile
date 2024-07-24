import { PrivateArtist } from '../artist.entity';

export interface CreateArtistBodyDto {
	name: string;
}

export interface CreateArtistResponseDto extends PrivateArtist {}
