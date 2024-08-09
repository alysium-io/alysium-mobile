import { BlurView, Icon, View } from '@atomic';
import {
	BottomSheetFooter,
	BottomSheetFooterProps
} from '@gorhom/bottom-sheet';
import { SheetApi, useLayoutDimensions, useTheme } from '@hooks';
import { IChildrenProps, ThemeMode } from '@types';
import React, { useCallback } from 'react';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheet } from '../overrides';

interface FullScreenSheetWithHeaderAndFooterProps extends IChildrenProps {
	FooterContent: React.ReactNode;
	sheetApi: SheetApi;
}

const FullScreenSheetWithHeaderAndFooter: React.FC<
	FullScreenSheetWithHeaderAndFooterProps
> = ({ sheetApi, FooterContent, children }) => {
	const { theme, themeMode } = useTheme();
	const insets = useSafeAreaInsets();
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
					{FooterContent}
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
				{children}
			</ScrollView>
		</BottomSheet>
	);
};

export default FullScreenSheetWithHeaderAndFooter;
