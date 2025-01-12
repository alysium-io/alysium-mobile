import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Icon, Text, View } from '@atomic';
import { useSheet } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import React from 'react';
import EditUserProfileBottomSheet from './sheets/EditUserProfileBottomSheet';

const UserProfilePageHeader: React.FC = () => {
	const { userData } = useUserAppContext();
	const editUserProfileBottomSheet = useSheet();

	return (
		<Header>
			<HeaderSection
				LeftComponent={
					<HeaderTitle
						title={
							<View flexDirection='row' alignItems='center'>
								<Icon name='at' color='text.s' size='xs' />
								<Text marginLeft='xs' variant='paragraph'>
									{userData.handle}
								</Text>
							</View>
						}
						subtitle='user'
						subtitleProps={{
							color: 'text.q'
						}}
						titleProps={{ variant: 'paragraph', color: 'text.q' }}
					/>
				}
				RightComponent={
					<HeaderIconButton
						name='menu'
						onPress={editUserProfileBottomSheet.open}
					/>
				}
			/>
			<EditUserProfileBottomSheet sheetApi={editUserProfileBottomSheet} />
		</Header>
	);
};

export default UserProfilePageHeader;
