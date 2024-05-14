import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useKeyboard } from '@hooks';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomSheetMaxHeight } from '../hooks';

interface BottomSheetViewWithMaxHeightProps {
	maxHeight?: string;
	contentContainerStyle?: React.ComponentProps<typeof BottomSheetView>['style'];
	children?: React.ReactNode;
}

const BottomSheetViewWithMaxHeight: React.FC<
	BottomSheetViewWithMaxHeightProps
> = ({ maxHeight = '90%', contentContainerStyle, children }) => {
	const maxHeightStyle = useBottomSheetMaxHeight(maxHeight);
	const { isVisible } = useKeyboard();
	const insets = useSafeAreaInsets();

	return (
		<BottomSheetView
			style={[
				{
					maxHeight: maxHeightStyle,
					paddingBottom: isVisible ? 0 : insets.bottom
				},
				contentContainerStyle
			]}
		>
			{children}
		</BottomSheetView>
	);
};

export default BottomSheetViewWithMaxHeight;
