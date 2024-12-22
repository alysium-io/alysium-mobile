import { Text, View } from '@atomic';
import { Header, HeaderSection } from '@organisms';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface EditContactPageHeaderProps {
	onCancel: () => void;
	onSubmit: () => void;
	isValid: boolean;
}

const EditContactPageHeader: React.FC<EditContactPageHeaderProps> = ({
	onCancel,
	onSubmit,
	isValid
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

export default EditContactPageHeader;
