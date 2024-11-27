import { ActivityIndicator, Text, View } from '@atomic';
import { Header, HeaderSection } from '@organisms';
import React from 'react';
import { Else, If, Then } from 'react-if';
import { TouchableOpacity } from 'react-native';

interface EditContactPageHeaderProps {
	onCancel: () => void;
	onSave: () => void;
	isLoading: boolean;
}

const EditContactPageHeader: React.FC<EditContactPageHeaderProps> = ({
	onCancel,
	onSave,
	isLoading
}) => {
	return (
		<Header>
			<HeaderSection
				LeftComponent={
					<TouchableOpacity onPress={onCancel}>
						<View>
							<Text variant='paragraph' color='text.t'>
								Cancel
							</Text>
						</View>
					</TouchableOpacity>
				}
				RightComponent={
					<If condition={isLoading}>
						<Then>
							<ActivityIndicator size='small' color='text.t' />
						</Then>
						<Else>
							<TouchableOpacity onPress={onSave}>
								<View>
									<Text variant='paragraph-medium' color='text.color.s.heavy'>
										Save
									</Text>
								</View>
							</TouchableOpacity>
						</Else>
					</If>
				}
			/>
		</Header>
	);
};

export default EditContactPageHeader;
