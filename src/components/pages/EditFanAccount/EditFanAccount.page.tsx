import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { ScrollView, Text, View } from '@atomic';
import { useNavigation, useTheme } from '@hooks';
import { EditableProfileImage, FormTextDisplay } from '@molecules';
import { BasePage } from '@organisms';
import React from 'react';
import EditFanAccountHeader from './EditFanAccount.header';

const EditFanAccountPage = () => {
	const { userData, setUserProfileImage } = useUserAppContext();
	const { theme } = useTheme();
	const { editFanHandlePage } = useNavigation();

	return (
		<BasePage>
			<EditFanAccountHeader />
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					margin: theme.spacing.m,
					gap: theme.spacing.m
				}}
			>
				<View alignItems='center'>
					<EditableProfileImage
						image={userData.profile_image?.small.key}
						onChooseImage={setUserProfileImage}
						size='large'
					/>
				</View>
				<FormTextDisplay label='Handle' onPress={editFanHandlePage}>
					{userData.handle}
				</FormTextDisplay>
				<Text variant='paragraph-small' color='text.q'>
					Fan account handle
				</Text>
			</ScrollView>
		</BasePage>
	);
};

export default EditFanAccountPage;
