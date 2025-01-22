import { sceneApiSlice } from '@flux/api/scene';
import { BasePage, Parallax } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { ParallaxLoading } from '@templates';
import { ScenePageRouteProp } from '@types';
import React, { useCallback } from 'react';
import ScenePageHeader from './Scene.header';
import ArtistsSection from './components/ArtistsSection';
import LocationParallaxMapDisplay from './components/LocationParallaxMapDisplay';
import SubHeader from './components/SubHeader';

const Scene = () => {
	const { params } = useRoute<ScenePageRouteProp>();
	const { data: sceneData } = sceneApiSlice.useFindOneSceneQuery({
		params: {
			scene_uid: params.scene_uid
		}
	});

	const CustomImage = useCallback(
		() =>
			sceneData?.location && (
				<LocationParallaxMapDisplay location={sceneData.location} />
			),
		[sceneData?.location]
	);

	if (!sceneData) {
		return <ParallaxLoading />;
	}

	return (
		<BasePage>
			<ScenePageHeader title={sceneData.name} subtitle={sceneData.country} />
			<Parallax CustomImage={CustomImage}>
				<SubHeader sceneData={sceneData} />
				<ArtistsSection scene_uid={params.scene_uid} />
			</Parallax>
		</BasePage>
	);
};

export default Scene;
