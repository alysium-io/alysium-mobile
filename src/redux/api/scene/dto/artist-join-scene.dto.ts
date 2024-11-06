import { ApiIdentifier } from '@types';
import { Scene } from '../scene.entity';

export interface ArtistJoinSceneBodyDto {
	place_id: string;
	artist_uid: ApiIdentifier;
}

export interface ArtistJoinSceneResponseDto extends Scene {}
