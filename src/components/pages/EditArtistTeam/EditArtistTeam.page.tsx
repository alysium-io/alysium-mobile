import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { ScrollView, Text } from '@atomic';
import { UserArtistLink } from '@flux/api/user-artist-link/user-artist-link.entity';
import { PublicUser } from '@flux/api/user/user.entity';
import { useArtistTeam, useNavigation, useSheet } from '@hooks';
import { ContentListItem } from '@molecules';
import { BasePage } from '@organisms';
import { ModifyArtistTeamMemberPermissionsBottomSheet } from '@popups';
import React, { useState } from 'react';
import EditArtistTeamPageHeader from './EditArtistTeam.header';
const EditArtistTeamPage = () => {
	const modifyTeamMemberSheetApi = useSheet();
	const { userData } = useUserAppContext();
	const { addArtistTeamMemberPage } = useNavigation();
	const [selectedUser, setSelectedUser] = useState<PublicUser | null>(null);
	const { team } = useArtistTeam();

	const onSelectUser = (userArtistLink: UserArtistLink) => {
		setSelectedUser(userArtistLink.user);
		modifyTeamMemberSheetApi.open();
	};

	return (
		<BasePage>
			<EditArtistTeamPageHeader />
			<ScrollView>
				<Text variant='paragraph' color='text.q' margin='m'>
					Team members can view or edit{' '}
					<Text variant='paragraph-bold' color='text.q'>
						private
					</Text>{' '}
					information about your events & profile.
				</Text>
				<ContentListItem
					profileImageProps={{
						defaultImageProps: {
							icon: 'plus'
						},
						containerProps: {
							borderWidth: 1,
							borderRadius: 'round',
							borderColor: 'border.light'
						}
					}}
					titleTextProps={{
						title: 'Add Team Member',
						bottomSubtext: 'Manager, entourage, etc.',
						bottomSubtextColor: 'text.q'
					}}
					onPress={addArtistTeamMemberPage}
				/>
				{team?.map(
					(userArtistLink) =>
						userArtistLink.user.user_uid !== userData.user_uid && (
							<ContentListItem
								key={userArtistLink.user.user_uid}
								titleTextProps={{
									title: '@' + userArtistLink.user.handle,
									titleVariant: 'paragraph',
									bottomSubtext: userArtistLink.permissions,
									bottomSubtextColor: 'text.q'
								}}
								onPress={() => onSelectUser(userArtistLink)}
								profileImageProps={{
									image: userArtistLink.user.profile_image?.small.key
								}}
							/>
						)
				)}
			</ScrollView>
			<ModifyArtistTeamMemberPermissionsBottomSheet
				sheetApi={modifyTeamMemberSheetApi}
				user_uid={selectedUser?.user_uid ?? null}
				handle={selectedUser?.handle ?? null}
			/>
		</BasePage>
	);
};

export default EditArtistTeamPage;
