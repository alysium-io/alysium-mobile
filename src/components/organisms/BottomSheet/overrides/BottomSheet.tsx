import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetRef, useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';
import BottomSheetBackdrop from './BottomSheetBackdrop';
import BottomSheetHandle from './BottomSheetHandle';

type BottomSheetProps = Props<typeof BottomSheetModal> & {
	children?: React.ReactNode;
	sheetRef: SheetRef;
	maxHeight?: string;
	borderRadius?: boolean;
	backgroundColor?: string;
	borderColor?: string;
	contentContainerStyle?: Props<typeof BottomSheetView>['style'];
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

	const springConfig = {
		damping: 30,
		mass: 1,
		stiffness: 300
	};

	return (
		<BottomSheetModal
			ref={sheetRef}
			index={0}
			backdropComponent={BottomSheetBackdrop}
			handleComponent={handleComponent}
			enablePanDownToClose={enablePanDownToClose}
			animationConfigs={springConfig}
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
