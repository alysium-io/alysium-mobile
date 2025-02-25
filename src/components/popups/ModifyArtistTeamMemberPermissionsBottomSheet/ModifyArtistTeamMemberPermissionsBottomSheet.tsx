import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { userArtistLinkApiSlice } from '@flux/api/user-artist-link';
import { UserArtistLinkPermissions } from '@flux/api/user-artist-link/types';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useArtistTeam } from '@hooks';
import { ActionButtons, SingleOptionRadioToggler } from '@molecules';
import { BottomSheet } from '@organisms';
import { captureException } from '@sentry/react-native';
import { Alert } from '@templates';
import { NanoId } from '@types';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

interface ModifyArtistTeamMemberPermissionsBottomSheetProps {
	sheetApi: SheetApi;
	user_uid: NanoId;
	handle: string;
	initialPermissions: UserArtistLinkPermissions;
	hasPermissions: boolean;
	onPermissionsGranted?: (permissions: UserArtistLinkPermissions) => void;
	onPermissionsRevoked?: () => void;
}

const ModifyArtistTeamMemberPermissionsBottomSheet: React.FC<
	ModifyArtistTeamMemberPermissionsBottomSheetProps
> = ({
	sheetApi,
	user_uid,
	handle,
	initialPermissions,
	hasPermissions,
	onPermissionsGranted,
	onPermissionsRevoked
}) => {
	const insets = useSafeAreaInsets();
	const [selectedPermission, setSelectedPermission] =
		useState<UserArtistLinkPermissions>(initialPermissions);
	const [grantArtistAccessMutation] =
		userArtistLinkApiSlice.useGrantArtistAccessMutation();
	const [revokeArtistAccessMutation] =
		userArtistLinkApiSlice.useRevokeArtistAccessMutation();
	const { artistData } = useArtistAppContext();

	const onRequestGrantAccess = () => {
		Alert.alert(
			`Grant @${handle} access of ${selectedPermission}`,
			'Are you sure you want to grant access?',
			[
				{
					text: 'Cancel',
					style: 'cancel'
				},
				{ text: 'Grant Access', onPress: onGrantAccess }
			]
		);
	};

	const onRequestRevokeAccess = () => {
		Alert.alert(
			`Revoke @${handle}`,
			'Are you sure you want to revoke access?',
			[
				{ text: 'Cancel', style: 'cancel' },
				{ text: 'Revoke', style: 'destructive', onPress: onRevokeAccess }
			]
		);
	};

	const onGrantAccess = async () => {
		await grantArtistAccessMutation({
			body: {
				user_uid: user_uid,
				artist_uid: artistData.artist_uid,
				permissions: selectedPermission
			}
		})
			.unwrap()
			.then(() => {
				Toast.show({
					text1: 'Success',
					text2: `Access granted to @${handle}`
				});
				onPermissionsGranted?.(selectedPermission);
			})
			.catch((err) => {
				captureException(err);
				Toast.show({
					text1: 'Error',
					text2: err.message
				});
			})
			.finally(() => {
				sheetApi.close();
			});
	};

	const onRevokeAccess = async () => {
		await revokeArtistAccessMutation({
			body: {
				user_uid,
				artist_uid: artistData.artist_uid
			}
		})
			.unwrap()
			.then(() => {
				Toast.show({
					text1: 'Success',
					text2: `Access revoked from @${handle}`
				});
				onPermissionsRevoked?.();
			})
			.catch((err) => {
				captureException(err);
				Toast.show({
					text1: 'Error',
					text2: err.message
				});
			})
			.finally(() => {
				sheetApi.close();
			});
	};

	return (
		<BottomSheetView>
			<View flex={1}>
				<SingleOptionRadioToggler
					defaultId={selectedPermission}
					onChange={setSelectedPermission}
					items={[
						{
							id: UserArtistLinkPermissions.insider,
							titleTextProps: {
								title: 'Insider',
								titleVariant: 'paragraph',
								bottomSubtext: 'Can view private information, but cannot edit.',
								bottomSubtextProps: {
									numberOfLines: 0
								},
								bottomSubtextColor: 'text.q'
							}
						},
						{
							id: UserArtistLinkPermissions.manager,
							titleTextProps: {
								title: 'Manager',
								titleVariant: 'paragraph',
								bottomSubtext: 'Can view & edit private information.',
								bottomSubtextProps: {
									numberOfLines: 0
								},
								bottomSubtextColor: 'text.q'
							}
						}
					]}
				/>
			</View>
			<View margin='m' style={{ marginBottom: insets.bottom }}>
				{hasPermissions ? (
					<ActionButtons
						buttonProps={[
							{
								text: 'Revoke Access',
								color: 't',
								variant: 'outlined',
								onPress: onRequestRevokeAccess
							},
							{
								text: 'Save',
								color: 'p',
								onPress: onRequestGrantAccess
							}
						]}
					/>
				) : (
					<ActionButtons
						buttonProps={{
							text: 'Grant Access',
							color: 'p',
							onPress: onRequestGrantAccess
						}}
					/>
				)}
			</View>
		</BottomSheetView>
	);
};

interface NullGuardProps {
	sheetApi: SheetApi;
	user_uid: NanoId | null;
	handle: string | null;
	onPermissionsGranted?: (permissions: UserArtistLinkPermissions) => void;
	onPermissionsRevoked?: () => void;
}

export default ({
	sheetApi,
	user_uid,
	handle,
	onPermissionsGranted,
	onPermissionsRevoked
}: NullGuardProps) => {
	const { getUserPermissions, userHasExistingPermissions } = useArtistTeam();

	const getInitialPermissions = (): UserArtistLinkPermissions => {
		// This is essentially just a null guard fallback, but shouldn't trigger in normal use
		if (!user_uid || !handle) return UserArtistLinkPermissions.insider;

		// If the user already has permissions, use them
		const existingPermissions = getUserPermissions(user_uid);
		if (existingPermissions) return existingPermissions;

		// Otherwise, default to insider
		return UserArtistLinkPermissions.insider;
	};

	const hasPermissions = userHasExistingPermissions(user_uid);
	const initialPermissions = getInitialPermissions();

	return (
		<BottomSheet ref={sheetApi.sheetRef}>
			{user_uid && handle && initialPermissions && (
				<ModifyArtistTeamMemberPermissionsBottomSheet
					sheetApi={sheetApi}
					user_uid={user_uid}
					handle={handle}
					initialPermissions={initialPermissions}
					hasPermissions={hasPermissions}
					onPermissionsGranted={onPermissionsGranted}
					onPermissionsRevoked={onPermissionsRevoked}
				/>
			)}
		</BottomSheet>
	);
};
