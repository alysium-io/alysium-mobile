import { useKeyboard } from '@hooks';
import { ChildrenProps, Props } from '@types';
import React from 'react';
import { ScrollView } from 'react-native';
import { useFullScreenSheet } from './useFullScreenSheet';

type FullScreenSheetScrollViewProps = ChildrenProps &
	Props<typeof ScrollView> & {};

const FullScreenSheetScrollView: React.FC<FullScreenSheetScrollViewProps> = ({
	children,
	...props
}) => {
	const { footerLayoutApi } = useFullScreenSheet();
	const { dismiss } = useKeyboard();

	return (
		<ScrollView
			keyboardShouldPersistTaps='always'
			style={{ flex: 1, overflow: 'visible' }}
			contentContainerStyle={{
				paddingBottom: footerLayoutApi.dimensions.height
			}}
			scrollIndicatorInsets={{
				bottom: footerLayoutApi.dimensions.height
			}}
			onScrollBeginDrag={dismiss}
			{...props}
		>
			{children}
		</ScrollView>
	);
};

export default FullScreenSheetScrollView;
