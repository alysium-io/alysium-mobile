import {
	BottomSheetFooterProps,
	BottomSheetModalProps
} from '@gorhom/bottom-sheet';
import { LayoutApi, SheetApi, useKeyboard } from '@hooks';
import { Header, HeaderIconButton, HeaderSection } from '@organisms';
import { IChildrenProps } from '@types';
import React from 'react';
import { ScrollView } from 'react-native';
import { BottomSheet } from '../overrides';

interface FullScreenSheetWithHeaderAndFooterProps
	extends IChildrenProps,
		Omit<BottomSheetModalProps, 'children'> {
	footerComponent?: React.FC<BottomSheetFooterProps>;
	sheetApi: SheetApi;
	sheetDidOpen?: () => void;
	animateFooterWithKeyboard?: boolean;
	footerLayoutApi: LayoutApi;
}

const FullScreenSheetWithHeaderAndFooter: React.FC<
	FullScreenSheetWithHeaderAndFooterProps
> = ({
	sheetApi,
	footerComponent,
	sheetDidOpen,
	footerLayoutApi,
	children,
	...props
}) => {
	const { dismiss } = useKeyboard();

	const onChange = (index: number) => {
		if (index === 0) {
			sheetDidOpen && sheetDidOpen();
		}
	};

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			snapPoints={['100%']}
			handleComponent={null}
			footerComponent={footerComponent}
			onChange={onChange}
			{...props}
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
					paddingBottom: footerLayoutApi.dimensions.height
				}}
				scrollIndicatorInsets={{
					bottom: footerLayoutApi.dimensions.height
				}}
				onScrollBeginDrag={dismiss}
			>
				{children}
			</ScrollView>
		</BottomSheet>
	);
};

export default FullScreenSheetWithHeaderAndFooter;
