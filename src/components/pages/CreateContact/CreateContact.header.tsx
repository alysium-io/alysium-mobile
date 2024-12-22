import { Text, View } from '@atomic';
import { useNavigation } from '@hooks';
import { Header, HeaderSection } from '@organisms';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface CreateContactPageHeaderProps {
	isValid: boolean;
	onSubmit: () => void;
}

const CreateContactPageHeader: React.FC<CreateContactPageHeaderProps> = ({
	isValid,
	onSubmit
}) => {
	const { back } = useNavigation();
	return (
		<Header>
			<HeaderSection
				LeftComponent={
					<TouchableOpacity onPress={back}>
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

export default CreateContactPageHeader;
