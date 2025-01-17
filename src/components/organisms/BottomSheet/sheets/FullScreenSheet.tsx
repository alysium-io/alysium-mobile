import { View } from '@atomic';
import { BottomSheetModalProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { ActionButtons } from '@molecules';
import { IChildrenProps, Props } from '@types';
import React from 'react';
import { BottomSheet } from '../overrides';
import FullScreenSheetFooter from './FullScreenSheetFooter';
import FullScreenSheetHeader from './FullScreenSheetHeader';

interface FullScreenSheetProps
	extends IChildrenProps,
		Omit<BottomSheetModalProps, 'children' | 'onChange'> {
	sheetApi: SheetApi;
	withButtons?: boolean;
	withHeader?: boolean;
	buttonProps?: Props<typeof ActionButtons>['buttonProps'];
	sheetDidOpen?: () => void;
	sheetDidClose?: () => void;
}

const FullScreenSheet: React.FC<FullScreenSheetProps> = ({
	sheetApi,
	children,
	withButtons = true,
	withHeader = true,
	buttonProps,
	sheetDidOpen,
	sheetDidClose,
	...props
}) => {
	const onChange = (index: number) => {
		if (index === 0 && sheetDidOpen) {
			sheetDidOpen();
		}
		if (index === -1 && sheetDidClose) {
			sheetDidClose();
		}
	};

	return (
		<BottomSheet
			ref={sheetApi.sheetRef}
			snapPoints={['100%']}
			handleComponent={null}
			onChange={onChange}
			{...props}
		>
			<BottomSheetView style={{ flex: 1 }}>
				{withHeader && <FullScreenSheetHeader sheetApi={sheetApi} />}
				<View flex={1}>{children}</View>
				{withButtons && (
					<FullScreenSheetFooter
						sheetApi={sheetApi}
						buttonProps={buttonProps}
					/>
				)}
			</BottomSheetView>
		</BottomSheet>
	);
};

export default FullScreenSheet;
