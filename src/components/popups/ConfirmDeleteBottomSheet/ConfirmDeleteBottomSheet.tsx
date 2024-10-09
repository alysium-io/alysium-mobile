import { View } from '@atomic';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { Button } from '@molecules';
import { BottomSheet } from '@organisms';
import { IChildrenProps } from '@types';
import React from 'react';

interface ConfirmDeleteAccountBottomSheetProps extends IChildrenProps {
	sheetApi: SheetApi;
	onPressDeleteAccount: () => void;
}

const ConfirmDeleteAccountBottomSheet: React.FC<
	ConfirmDeleteAccountBottomSheetProps
> = ({ sheetApi, onPressDeleteAccount, children }) => {
	return (
		<BottomSheet sheetRef={sheetApi.sheetRef} snapPoints={['50%']}>
			<BottomSheetView style={{ flex: 1 }}>
				<View flex={1} margin='m' justifyContent='space-between'>
					<View margin='m' justifyContent='center' alignItems='center'>
						{children}
					</View>
					<View marginBottom='m'>
						<Button
							onPress={sheetApi.close}
							variant='outlined'
							text='cancel'
							containerProps={{ marginBottom: 'm' }}
						/>
						<Button
							onPress={onPressDeleteAccount}
							color='t'
							text='confirm delete'
						/>
					</View>
				</View>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default ConfirmDeleteAccountBottomSheet;
