import {
	BottomSheetModal,
	BottomSheetView,
	SNAP_POINT_TYPE
} from '@gorhom/bottom-sheet';
import { useTheme } from '@hooks';
import { Props } from '@types';
import React, { forwardRef, useMemo } from 'react';
import BottomSheetBackdrop from './BottomSheetBackdrop';
import BottomSheetHandle from './BottomSheetHandle';

type BottomSheetProps = Props<typeof BottomSheetModal> & {
	children?: React.ReactNode;
	maxHeight?: string;
	borderRadius?: boolean;
	backgroundColor?: string;
	borderColor?: string;
	contentContainerStyle?: Props<typeof BottomSheetView>['style'];
	sheetDidOpen?: () => void;
};

const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
	(
		{
			children,
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
			index = 0,
			...props
		},
		ref
	) => {
		const { theme } = useTheme();

		const springConfig = useMemo(
			() => ({
				damping: 30,
				mass: 1,
				stiffness: 300
			}),
			[]
		);

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
				ref={ref}
				index={index}
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
					borderRadius: 25,
					overflow: 'hidden'
				}}
				{...props}
			>
				{children}
			</BottomSheetModal>
		);
	}
);

export default BottomSheet;
