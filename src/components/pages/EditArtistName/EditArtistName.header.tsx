import { Text, View } from '@atomic';
import { Header, HeaderSection } from '@organisms';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ChooseScenePageHeaderProps {
	onCancel: () => void;
	onSubmit: () => void;
}

const ChooseScenePageHeader: React.FC<ChooseScenePageHeaderProps> = ({
	onCancel,
	onSubmit
}) => {
	return (
		<Header>
			<HeaderSection
				LeftComponent={
					<TouchableOpacity onPress={onCancel}>
						<View>
							<Text variant='paragraph' color='text.p'>
								Cancel
							</Text>
						</View>
					</TouchableOpacity>
				}
				RightComponent={
					<TouchableOpacity onPress={onSubmit}>
						<View>
							<Text variant='paragraph' color='text.p'>
								Done
							</Text>
						</View>
					</TouchableOpacity>
				}
			/>
		</Header>
	);
};

export default ChooseScenePageHeader;
