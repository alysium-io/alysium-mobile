import { Text, View } from '@atomic';
import { FindOneSceneResponseDto } from '@flux/api/scene/dto/find-one-scene.dto';
import { Stats } from '@organisms';
import React from 'react';
import FollowSceneButton from './FollowSceneButton';

interface SubHeaderProps {
	sceneData: FindOneSceneResponseDto;
}

const SubHeader: React.FC<SubHeaderProps> = ({ sceneData }) => {
	return (
		<View margin='m'>
			<View flexDirection='row' justifyContent='space-between' marginBottom='m'>
				<View flex={1}>
					<Text
						variant='paragraph-large-medium'
						marginBottom='xs'
						adjustsFontSizeToFit
						minimumFontScale={0.8}
						numberOfLines={2}
					>
						{sceneData.name}
					</Text>
					<Text
						variant='paragraph-medium'
						color='text.q'
						adjustsFontSizeToFit
						minimumFontScale={0.8}
						numberOfLines={1}
					>
						{sceneData.country}
					</Text>
				</View>
				<Stats
					items={[
						{
							title: sceneData.num_artists.toLocaleString(),
							subtitle: 'artist' + (sceneData.num_artists === 1 ? '' : 's')
						},
						{
							title: sceneData.num_events.toLocaleString(),
							subtitle: 'event' + (sceneData.num_events === 1 ? '' : 's')
						},
						{
							title: sceneData.num_followers.toLocaleString(),
							subtitle: 'follower' + (sceneData.num_followers === 1 ? '' : 's')
						}
					]}
				/>
			</View>
			<FollowSceneButton sceneData={sceneData} />
		</View>
	);
};

export default SubHeader;
