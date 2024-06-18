import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { BottomSheet } from '@organisms';
import { IChildrenProps } from '@types';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ContainerProps extends IChildrenProps {
	sheetApi: SheetApi;
}

const Container: React.FC<ContainerProps> = ({ sheetApi, children }) => {
	const insets = useSafeAreaInsets();

	return (
		<BottomSheet sheetRef={sheetApi.sheetRef} enableDynamicSizing>
			<BottomSheetView style={{ paddingBottom: insets.bottom }}>
				{children}
			</BottomSheetView>
		</BottomSheet>
	);
};

export default Container;
