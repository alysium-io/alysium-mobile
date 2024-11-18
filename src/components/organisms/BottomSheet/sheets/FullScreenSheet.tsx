import {
	BottomSheetFooterProps,
	BottomSheetModalProps
} from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { IChildrenProps, Props } from '@types';
import React, { useCallback } from 'react';
import { BottomSheet } from '../overrides';
import FullScreenSheetScrollView from './FullScreenSheetScrollView';
import { FullScreenSheetProvider } from './useFullScreenSheet';

interface FullScreenSheetProps
	extends IChildrenProps,
		Omit<BottomSheetModalProps, 'children'> {
	footerComponent?: React.FC<BottomSheetFooterProps>;
	sheetApi: SheetApi;
	sheetDidOpen?: () => void;
	animateFooterWithKeyboard?: boolean;
	scrollViewProps?: Props<typeof FullScreenSheetScrollView>;
}

const FullScreenSheet: React.FC<FullScreenSheetProps> = ({
	sheetApi,
	footerComponent,
	sheetDidOpen,
	scrollViewProps,
	children,
	...props
}) => {
	const onChange = (index: number) => {
		if (index === 0) {
			sheetDidOpen && sheetDidOpen();
		}
	};

	const containerComponent = useCallback(
		(props: IChildrenProps) => (
			<FullScreenSheetProvider sheetApi={sheetApi}>
				{props.children}
			</FullScreenSheetProvider>
		),
		[]
	);

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			snapPoints={['100%']}
			handleComponent={null}
			footerComponent={footerComponent}
			onChange={onChange}
			containerComponent={containerComponent}
			{...props}
		>
			{children}
		</BottomSheet>
	);
};

export default FullScreenSheet;
