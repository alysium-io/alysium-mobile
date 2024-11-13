import { Scene } from '../scene.entity';

export interface FindOneSceneByPlaceParamsDto {
	place_id: string;
}

export interface FindOneSceneByPlaceResponseDto extends Scene {}
