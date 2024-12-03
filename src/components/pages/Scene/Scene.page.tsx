import { View } from '@atomic';
import { sceneApiSlice } from '@flux/api/scene';
import { Location } from '@molecules';
import { BasePage, Parallax } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { ScenePageRouteProp } from '@types';
import React, { useCallback } from 'react';
import ScenePageHeader from './Scene.header';
import ArtistsSection from './components/ArtistsSection';
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
				<View height='100%'>
					<Location
						markers={{
							location: sceneData.location,
							label: sceneData.name,
							color: 'blue'
						}}
						containerProps={{
							height: '100%'
						}}
					/>
				</View>
			),
		[sceneData]
	);

	if (!sceneData) {
		return null;
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
