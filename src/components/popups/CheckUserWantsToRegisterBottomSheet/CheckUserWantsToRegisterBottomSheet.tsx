import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Icon, Text, View } from '@atomic';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { Button } from '@molecules';
import { BottomSheet } from '@organisms';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CheckUserWantsToRegisterBottomSheetProps {
	sheetApi: SheetApi;
}

const CheckUserWantsToRegisterBottomSheet: React.FC<
	CheckUserWantsToRegisterBottomSheetProps
> = ({ sheetApi }) => {
	const insets = useSafeAreaInsets();
	const { createAccountBottomSheetApi } = useUserAppContext();
	return (
		<BottomSheet sheetRef={sheetApi.sheetRef} snapPoints={['50%']}>
			<BottomSheetView
				style={{
					flex: 1,
					marginBottom: insets.bottom
				}}
			>
				<View margin='m' flex={1}>
					<View flex={1}>
						<View alignItems='center'>
							<Icon name='logo' size='l' color='text.p' />
						</View>
						<View margin='m'>
							<Text
								variant='section-header-1'
								textAlign='center'
								marginBottom='m'
							>
								Create an Account
							</Text>
							<Text
								variant='paragraph'
								textAlign='center'
								color='text.s'
								marginBottom='m'
							>
								You must create an account to access that feature.
							</Text>
							<Text
								variant='paragraph-small'
								textAlign='center'
								color='text.s'
								marginBottom='m'
							>
								We can't save anything to you unless we know who you are *sad
								face*. Don't worry, we will never share your information with
								anyone. Pinky promise.
							</Text>
							<Text
								variant='paragraph-small'
								textAlign='center'
								color='text.s'
								marginBottom='m'
							>
								We give you as much access as we can in the mean time ;)
							</Text>
						</View>
					</View>
					<View flexDirection='row'>
						<View flex={1} marginRight='s'>
							<Button
								text='Cancel'
								variant='outlined'
								onPress={sheetApi.close}
							/>
						</View>
						<View flex={1} marginLeft='s'>
							<Button
								text='Continue'
								onPress={() => {
									sheetApi.close();
									createAccountBottomSheetApi.open();
								}}
							/>
						</View>
					</View>
				</View>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default CheckUserWantsToRegisterBottomSheet;
