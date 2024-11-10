import { NanoId } from '@types';
import { Scene } from '../scene.entity';

export interface ArtistJoinSceneBodyDto {
	place_id: string;
	artist_uid: NanoId;
}

export interface ArtistJoinSceneResponseDto extends Scene {}
