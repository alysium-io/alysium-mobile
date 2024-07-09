import {
	BottomSheetModal,
	BottomSheetView,
	useBottomSheetTimingConfigs
} from '@gorhom/bottom-sheet';
import { SheetRef, useTheme } from '@hooks';
import { ThemeMode } from '@types';
import React, { useMemo } from 'react';
import { Easing } from 'react-native-reanimated';
import BottomSheetBackdrop from './BottomSheetBackdrop';
import BottomSheetHandle from './BottomSheetHandle';

const colorScheme = {
	[ThemeMode.dark]: {
		background: 'bg1',
		border: 'bg3'
	},
	[ThemeMode.light]: {
		background: 'bg1',
		border: 'bg2'
	}
};

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
	const { mode, getRawColor } = useTheme();

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
				backgroundColor: backgroundColor
					? getRawColor(backgroundColor)
					: getRawColor(colorScheme[mode].background),
				borderRadius: borderRadius ? 25 : 0,
				borderTopWidth: borderColor ? 1 : 0,
				borderTopColor: borderColor || getRawColor(colorScheme[mode].border)
			}}
			{...props}
		>
			{children}
		</BottomSheetModal>
	);
};

export default BottomSheet;
