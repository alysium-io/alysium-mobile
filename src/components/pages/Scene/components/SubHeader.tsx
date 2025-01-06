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
				<View>
					<Text variant='paragraph-large-medium' marginBottom='xs'>
						{sceneData.name}
					</Text>
					<Text variant='paragraph-medium' color='text.q'>
						{sceneData.country}
					</Text>
				</View>
				<Stats
					items={[
						{
							title: sceneData.num_followers.toLocaleString(),
							subtitle: 'followers'
						}
					]}
				/>
			</View>
			<FollowSceneButton sceneData={sceneData} />
		</View>
	);
};

export default SubHeader;
