import { NanoId } from '@types';
import { Scene } from '../scene.entity';

export interface FindOneSceneParamsDto {
	scene_uid: NanoId;
}

export interface FindOneSceneResponseDto extends Scene {}
