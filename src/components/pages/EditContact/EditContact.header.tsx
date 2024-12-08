import { Text, View } from '@atomic';
import { SheetApi } from '@hooks';
import { Header, HeaderIconButton, HeaderSection } from '@organisms';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface EditContactPageHeaderProps {
	onCancel: () => void;
	popupMenuSheetApi: SheetApi;
}

const EditContactPageHeader: React.FC<EditContactPageHeaderProps> = ({
	onCancel,
	popupMenuSheetApi
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
					<HeaderIconButton name='menu' onPress={popupMenuSheetApi.open} />
				}
			/>
		</Header>
	);
};

export default EditContactPageHeader;
