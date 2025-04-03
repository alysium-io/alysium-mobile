import { useAuthenticationAppContext } from '@arch/Authentication/Authentication.context';
import { Icon, Text, View } from '@atomic';
import {
	BottomSheetFooter,
	BottomSheetFooterProps,
	BottomSheetView
} from '@gorhom/bottom-sheet';
import { SheetApi, useTheme } from '@hooks';
import { ActionButtons } from '@molecules';
import { BottomSheet } from '@organisms';
import React, { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CreateAccountBottomSheetProps {
	sheetApi: SheetApi;
}

const CreateAccountBottomSheet: React.FC<CreateAccountBottomSheetProps> = ({
	sheetApi
}) => {
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	const { logout } = useAuthenticationAppContext();

	const FooterComponent = useCallback((props: BottomSheetFooterProps) => {
		return (
			<BottomSheetFooter {...props}>
				<View
					flex={1}
					padding='m'
					paddingBottom='none'
					style={{ marginBottom: insets.bottom }}
					borderTopWidth={theme.borderWidth.normal}
					borderTopColor='border.light'
				>
					<ActionButtons
						buttonProps={[
							{
								text: 'cancel',
								variant: 'outlined',
								onPress: sheetApi.close
							},
							{
								text: 'Create',
								color: 'p',
								onPress: logout
							}
						]}
					/>
				</View>
			</BottomSheetFooter>
		);
	}, []);

	return (
		<BottomSheet ref={sheetApi.sheetRef} footerComponent={FooterComponent}>
			<BottomSheetView>
				<View margin='m' gap='l'>
					<View alignItems='center'>
						<Icon name='logo' size='l' color='text.p' />
					</View>
					<Text variant='section-header-1' textAlign='center'>
						Create an Account?
					</Text>
					<Text variant='paragraph-small' textAlign='center' color='text.q'>
						When you create an account, you will have access to all of our
						features.
					</Text>
				</View>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default CreateAccountBottomSheet;
