import {
	BottomSheetFooter as RNBottomSheetFooter,
	BottomSheetFooterProps as RNBottomSheetFooterProps
} from '@gorhom/bottom-sheet';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomSheetFooterProps extends RNBottomSheetFooterProps {
	children?: React.ReactNode;
}

const BottomSheetFooter: React.FC<BottomSheetFooterProps> = ({
	children,
	animatedFooterPosition,
	...props
}) => {
	const insets = useSafeAreaInsets();

	return (
		<RNBottomSheetFooter
			{...props}
			animatedFooterPosition={animatedFooterPosition}
			bottomInset={insets.bottom}
		>
			{children}
		</RNBottomSheetFooter>
	);
};

export default BottomSheetFooter;
