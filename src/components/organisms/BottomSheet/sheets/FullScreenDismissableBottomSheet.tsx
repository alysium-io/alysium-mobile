import { ScrollView } from '@atomic';
import {
	BottomSheetFooterProps,
	BottomSheetProps,
	BottomSheetView
} from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { useHeader } from '@organisms';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { FooterWithDismissButton } from '../components';
import { BottomSheet } from '../overrides';

interface FullScreenDismissableBottomSheetProps extends BottomSheetProps {
	sheetApi: SheetApi;
	children: React.ReactNode;
}

const FullScreenDismissableBottomSheet: React.FC<
	FullScreenDismissableBottomSheetProps
> = ({ sheetApi, children }) => {
	const { totalHeaderHeight } = useHeader();
	const { height } = useWindowDimensions();

	const renderFooter = (props: BottomSheetFooterProps) => (
		<FooterWithDismissButton dismiss={sheetApi.close} {...props} />
	);

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			snapPoints={[height - totalHeaderHeight]}
			footerComponent={renderFooter}
			customHandle={() => null}
			enablePanDownToClose={false}
			enableContentPanningGesture={false}
			borderRadius={false}
		>
			<BottomSheetView>
				<ScrollView>{children}</ScrollView>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default FullScreenDismissableBottomSheet;
