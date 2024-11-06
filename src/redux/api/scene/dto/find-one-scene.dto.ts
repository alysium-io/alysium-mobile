import { Scene } from '../scene.entity';

export interface FindOneSceneParamsDto {
	place_id: string;
}

export interface FindOneSceneResponseDto extends Scene {}
