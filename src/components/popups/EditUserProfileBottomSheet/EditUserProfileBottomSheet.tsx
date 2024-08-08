import { BlurView, DismissKeyboardWrapper, Icon, View } from '@atomic';
import {
	BottomSheetFooter,
	BottomSheetFooterProps,
	TouchableWithoutFeedback
} from '@gorhom/bottom-sheet';
import { SheetApi, useLayoutDimensions, useTheme } from '@hooks';
import { Button } from '@molecules';
import { BottomSheet } from '@organisms';
import { ThemePicker } from '@templates';
import { ThemeMode } from '@types';
import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EditHandle from './components/EditHandle';
import EditProfileImage from './components/EditProfileImage';
import ThemeModeSettings from './components/ThemeModeSettings';
import useEditUserProfileBottomSheet from './useEditUserProfileBottomSheet';

interface EditUserProfileBottomSheetProps {
	sheetApi: SheetApi;
}

const EditUserProfileBottomSheet: React.FC<EditUserProfileBottomSheetProps> = ({
	sheetApi
}) => {
	const { theme, themeMode } = useTheme();
	const insets = useSafeAreaInsets();
	const { formMethods, handleTextInputApi, onSubmit } =
		useEditUserProfileBottomSheet(sheetApi);
	const { dimensions: footerDimensions, onLayout: onFooterLayout } =
		useLayoutDimensions();
	const { dimensions: headerDimensions, onLayout: onHeaderLayout } =
		useLayoutDimensions();

	const renderFooter = useCallback(
		(props: BottomSheetFooterProps) => (
			<BottomSheetFooter {...props}>
				<View
					padding='m'
					paddingBottom='none'
					paddingTop='l'
					flexDirection='row'
					style={{ paddingBottom: insets.bottom }}
					backgroundColor='bg.p'
					borderTopWidth={theme.borderWidth.thin}
					borderColor='border.light'
					onLayout={onFooterLayout}
				>
					<View flex={1} marginRight='s'>
						<Button text='cancel' onPress={sheetApi.close} variant='outlined' />
					</View>
					<View flex={1} marginLeft='s'>
						<Button text='Save' onPress={onSubmit} />
					</View>
				</View>
			</BottomSheetFooter>
		),
		[footerDimensions.height]
	);

	const Header = () => (
		<View
			position='absolute'
			width='100%'
			style={{
				paddingTop: insets.top
			}}
			onLayout={onHeaderLayout}
			backgroundColor={themeMode === ThemeMode.light ? 'transparent' : 'bg.p'}
			zIndex={999}
		>
			{themeMode === ThemeMode.light && (
				<BlurView
					blurAmount={50}
					blurType={theme.colors['etc.blur']}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0
					}}
				/>
			)}
			<TouchableWithoutFeedback onPress={sheetApi.close}>
				<View margin='m'>
					<Icon name='x' size='xl' />
				</View>
			</TouchableWithoutFeedback>
		</View>
	);

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			snapPoints={['100%']}
			handleComponent={null}
			footerComponent={renderFooter}
		>
			<Header />
			<ScrollView
				contentContainerStyle={{
					paddingTop: headerDimensions.height,
					paddingBottom: footerDimensions.height
				}}
				scrollIndicatorInsets={{
					top: headerDimensions.height - insets.top,
					bottom: footerDimensions.height
				}}
			>
				<DismissKeyboardWrapper>
					<EditProfileImage />
					<EditHandle
						formMethods={formMethods}
						handleTextInputApi={handleTextInputApi}
					/>
					<ThemePicker />
					<ThemeModeSettings />
				</DismissKeyboardWrapper>
			</ScrollView>
		</BottomSheet>
	);
};

export default EditUserProfileBottomSheet;
