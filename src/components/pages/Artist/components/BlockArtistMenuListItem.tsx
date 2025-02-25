import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { userApiSlice } from '@flux/api/user';
import { Role } from '@flux/api/user/user.entity';
import { SheetApi } from '@hooks';
import { MenuListItem } from '@molecules';
import { captureException } from '@sentry/react-native';
import { PublicArtist } from '@src/redux/api/artist/artist.entity';
import { Alert } from '@templates';
import React from 'react';
import Toast from 'react-native-toast-message';

interface BlockArtistMenuListItemProps {
	sheetApi: SheetApi;
	artist: PublicArtist;
}

const BlockArtistMenuListItem: React.FC<BlockArtistMenuListItemProps> = ({
	sheetApi,
	artist
}) => {
	const { userData } = useUserAppContext();
	const [blockArtistMutation] = userApiSlice.useBlockArtistMutation();
	const [unblockArtistMutation] = userApiSlice.useUnblockArtistMutation();

	const blockArtist = () => {
		blockArtistMutation({
			params: { artist_uid: artist.artist_uid }
		})
			.unwrap()
			.then(() => {
				sheetApi.close();
				Toast.show({
					text1: 'Artist blocked',
					text2: 'We will limit the visiblity of this artist to you'
				});
			})
			.catch((err) => {
				captureException(err);
				Toast.show({
					text1: 'Failed to block artist',
					text2: 'Please try again later'
				});
			});
	};

	const unblockArtist = () => {
		unblockArtistMutation({
			params: { artist_uid: artist.artist_uid }
		})
			.unwrap()
			.then(() => {
				sheetApi.close();
				Toast.show({
					text1: 'Artist unblocked',
					text2: 'We will now show this artist to you again'
				});
			})
			.catch((err) => {
				captureException(err);
				Toast.show({
					text1: 'Failed to unblock artist',
					text2: 'Please try again later'
				});
			});
	};

	const onPress = () => {
		Alert.alert(
			artist.is_blocked ? 'Unblock Artist' : 'Block Artist',
			artist.is_blocked
				? 'We will now show this artist to you again'
				: 'Limit visibility of this artist?',
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Confirm',
					onPress: artist.is_blocked ? unblockArtist : blockArtist
				}
			]
		);
	};

	if (userData.role === Role.guest) {
		return null;
	}

	return (
		<MenuListItem
			onPress={onPress}
			titleTextProps={{
				title: artist.is_blocked ? 'Unblock' : 'Block',
				bottomSubtext: artist.is_blocked
					? 'Show this artist to you again'
					: 'Limit visibility of this artist',
				titleVariant: 'paragraph',
				bottomSubtextColor: 'text.q'
			}}
			icon={artist.is_blocked ? 'eye' : 'block'}
			iconProps={{ size: 'm' }}
		/>
	);
};

export default BlockArtistMenuListItem;
