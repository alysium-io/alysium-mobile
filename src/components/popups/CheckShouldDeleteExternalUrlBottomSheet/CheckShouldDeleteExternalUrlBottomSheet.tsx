import { Text, View } from '@atomic';
import { externalUrlApiSlice } from '@flux/api/external-url';
import { ExternalUrl } from '@flux/api/external-url/external-url.entity';
import { ExternalUrlRefType } from '@flux/api/external-url/types';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { ActionButtons } from '@molecules';
import { BottomSheet, BottomSheetHeader } from '@organisms';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CheckShouldDeleteExternalUrlBottomSheetProps {
	sheetApi: SheetApi;
	externalUrl: ExternalUrl | null;
	refType: ExternalUrlRefType;
}

const CheckShouldDeleteExternalUrlBottomSheet: React.FC<
	CheckShouldDeleteExternalUrlBottomSheetProps
> = ({ sheetApi, externalUrl, refType }) => {
	const insets = useSafeAreaInsets();
	const [deleteExternalUrlMutation] =
		externalUrlApiSlice.useDeleteExternalUrlMutation();

	const onPressDelete = () => {
		if (externalUrl) {
			deleteExternalUrlMutation({
				body: {
					external_url_uid: externalUrl.external_url_uid,
					refType
				}
			});
			sheetApi.close();
		}
	};

	return (
		<BottomSheet sheetRef={sheetApi.sheetRef} snapPoints={['50%']}>
			<BottomSheetView
				style={{
					flex: 1,
					marginBottom: insets.bottom
				}}
			>
				<View margin='m' flex={1}>
					<BottomSheetHeader textAlign='center'>
						Delete the following link?
					</BottomSheetHeader>
					<View flex={1} justifyContent='center'>
						<Text
							variant='paragraph-medium'
							color='text.s'
							textAlign='center'
							marginBottom='m'
						>
							{externalUrl?.name}
						</Text>
						<Text variant='paragraph-small' color='text.q' textAlign='center'>
							{externalUrl?.url}
						</Text>
					</View>
				</View>
				<View margin='m'>
					<ActionButtons
						buttonProps={[
							{
								text: 'cancel',
								variant: 'outlined',
								onPress: sheetApi.close
							},
							{
								text: 'delete',
								color: 't',
								onPress: onPressDelete
							}
						]}
					/>
				</View>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default CheckShouldDeleteExternalUrlBottomSheet;
