import { View } from '@atomic';
import {
	BottomSheetFooter,
	BottomSheetFooterProps
} from '@gorhom/bottom-sheet';
import { SheetApi, useKeyboard, useLayoutDimensions, useTheme } from '@hooks';
import { Header, HeaderIconButton, HeaderSection } from '@organisms';
import { IChildrenProps } from '@types';
import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheet } from '../overrides';

interface FullScreenSheetWithHeaderAndFooterProps extends IChildrenProps {
	FooterContent: React.ReactNode;
	sheetApi: SheetApi;
}

const FullScreenSheetWithHeaderAndFooter: React.FC<
	FullScreenSheetWithHeaderAndFooterProps
> = ({ sheetApi, FooterContent, children }) => {
	const { theme } = useTheme();
	const insets = useSafeAreaInsets();
	const { dismiss } = useKeyboard();
	const { dimensions: footerDimensions, onLayout: onFooterLayout } =
		useLayoutDimensions();

	const renderFooter = useCallback(
		(props: BottomSheetFooterProps) => (
			<BottomSheetFooter {...props}>
				<View
					paddingHorizontal='m'
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

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			snapPoints={['100%']}
			handleComponent={null}
			footerComponent={renderFooter}
		>
			<Header>
				<HeaderSection
					LeftComponent={
						<HeaderIconButton name='x' onPress={sheetApi.close} size='xl' />
					}
				/>
			</Header>
			<ScrollView
				style={{ flex: 1, overflow: 'visible' }}
				contentContainerStyle={{
					paddingBottom: footerDimensions.height
				}}
				scrollIndicatorInsets={{
					bottom: footerDimensions.height
				}}
				onScrollBeginDrag={dismiss}
			>
				{children}
			</ScrollView>
		</BottomSheet>
	);
};

export default FullScreenSheetWithHeaderAndFooter;
