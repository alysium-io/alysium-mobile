import { Text, View } from '@atomic';
import { FindOneSceneResponseDto } from '@flux/api/scene/dto/find-one-scene.dto';
import React from 'react';

interface SubHeaderProps {
	sceneData: FindOneSceneResponseDto;
}

const SubHeader: React.FC<SubHeaderProps> = ({ sceneData }) => {
	return (
		<View margin='m' flexDirection='row' justifyContent='space-between'>
			<View>
				<Text variant='paragraph-large-medium' marginBottom='xs'>
					{sceneData.name}
				</Text>
				<Text variant='paragraph-medium' color='text.q'>
					{sceneData.country}
				</Text>
			</View>
		</View>
	);
};

export default SubHeader;
