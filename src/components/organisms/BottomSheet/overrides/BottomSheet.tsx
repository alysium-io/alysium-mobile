import {
	BottomSheetModal,
	BottomSheetView,
	SNAP_POINT_TYPE
} from '@gorhom/bottom-sheet';
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
	sheetDidOpen?: () => void;
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
	onChange,
	sheetDidOpen,
	maxDynamicContentSize = 600,
	...props
}) => {
	const { theme } = useTheme();

	const springConfig = {
		damping: 30,
		mass: 1,
		stiffness: 300
	};

	const _onChange = (
		index: number,
		position: number,
		type: SNAP_POINT_TYPE
	): void => {
		if (index === 0 && sheetDidOpen) {
			sheetDidOpen();
		}
		onChange && onChange(index, position, type);
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
			stackBehavior='push'
			onChange={_onChange}
			maxDynamicContentSize={maxDynamicContentSize}
			backgroundStyle={{
				backgroundColor: backgroundColor ?? theme.colors['bg.p'],
				borderRadius: 25
			}}
			{...props}
		>
			{children}
		</BottomSheetModal>
	);
};

export default BottomSheet;
