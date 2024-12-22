import { Icon, Text, View } from '@atomic';
import { Header, HeaderSection } from '@organisms';
import { IconNames } from '@svg';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface EditExternalLinkPageHeaderProps {
	onCancel: () => void;
	onSubmit: () => void;
	domainIcon: IconNames;
}

const EditExternalLinkPageHeader: React.FC<EditExternalLinkPageHeaderProps> = ({
	onCancel,
	onSubmit,
	domainIcon
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
				CenterComponent={<Icon name={domainIcon} size={24} color='text.p' />}
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

export default EditExternalLinkPageHeader;
