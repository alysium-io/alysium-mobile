import { Icon, Text, View } from '@atomic';
import { Header, HeaderSection } from '@organisms';
import { IconNames } from '@svg';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface CreateExternalLinkPageHeaderProps {
	onCancel: () => void;
	onSubmit: () => void;
	isValid: boolean;
	domainIcon: IconNames;
}

const CreateExternalLinkPageHeader: React.FC<
	CreateExternalLinkPageHeaderProps
> = ({ onCancel, onSubmit, isValid, domainIcon }) => {
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
					<TouchableOpacity onPress={onSubmit} disabled={!isValid}>
						<View>
							<Text variant='paragraph' color={isValid ? 'text.p' : 'text.q'}>
								Done
							</Text>
						</View>
					</TouchableOpacity>
				}
			/>
		</Header>
	);
};

export default CreateExternalLinkPageHeader;
