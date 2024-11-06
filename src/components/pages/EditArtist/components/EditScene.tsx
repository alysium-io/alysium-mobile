import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import React from 'react';

const EditScene = () => {
	const { chooseScenePage } = useNavigation();
	const { artistData } = useArtistAppContext();
	return (
		<View marginBottom='xxl'>
			<ContentListItem
				onPress={chooseScenePage}
				titleTextProps={{
					title: artistData.scene?.scene.name ?? 'Join a Scene',
					bottomSubtext:
						artistData.scene?.scene.country ?? 'What city do you live in?'
				}}
				profileImageProps={{
					borderRadius: 'none',
					defaultImageProps: {
						icon: 'location'
					}
				}}
			/>
		</View>
	);
};

export default EditScene;
