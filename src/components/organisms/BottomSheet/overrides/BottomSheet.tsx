import {
	BottomSheetModal,
	BottomSheetView,
	useBottomSheetTimingConfigs
} from '@gorhom/bottom-sheet';
import { SheetRef, useTheme } from '@hooks';
import React, { useMemo } from 'react';
import { Easing } from 'react-native-reanimated';
import BottomSheetBackdrop from './BottomSheetBackdrop';
import BottomSheetHandle from './BottomSheetHandle';

type BottomSheetProps = React.ComponentProps<typeof BottomSheetModal> & {
	children?: React.ReactNode;
	sheetRef: SheetRef;
	maxHeight?: string;
	borderRadius?: boolean;
	backgroundColor?: string;
	borderColor?: string;
	contentContainerStyle?: React.ComponentProps<typeof BottomSheetView>['style'];
};

const BottomSheet: React.FC<BottomSheetProps> = ({
	children,
	sheetRef,
	backgroundColor,
	borderColor,
	handleComponent = BottomSheetHandle,
	enablePanDownToClose = true,
	enableContentPanningGesture = false,
	borderRadius = true,
	contentContainerStyle,
	...props
}) => {
	const { theme } = useTheme();

	const easingConfig = useMemo(() => Easing.inOut(Easing.cubic), []);

	const animationConfigs = useBottomSheetTimingConfigs({
		duration: 300,
		easing: easingConfig
	});

	return (
		<BottomSheetModal
			ref={sheetRef}
			index={0}
			backdropComponent={BottomSheetBackdrop}
			handleComponent={handleComponent}
			enablePanDownToClose={enablePanDownToClose}
			animationConfigs={animationConfigs}
			enableDynamicSizing={props.snapPoints ? false : true}
			enableContentPanningGesture={enableContentPanningGesture}
			backgroundStyle={{
				backgroundColor: theme.colors['bg.p'],
				borderRadius: 25
			}}
			{...props}
		>
			{children}
		</BottomSheetModal>
	);
};

export default BottomSheet;
