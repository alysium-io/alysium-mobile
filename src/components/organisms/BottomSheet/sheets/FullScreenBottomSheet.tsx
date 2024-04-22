import { ScrollView } from '@atomic';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { useHeader } from '@organisms';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { BottomSheet } from '../overrides';

type FullScreenBottomSheetProps = React.ComponentProps<
	typeof BottomSheetModal
> & {
	sheetApi: SheetApi;
	children: React.ReactNode;
};

const FullScreenBottomSheet: React.FC<FullScreenBottomSheetProps> = ({
	sheetApi,
	children,
	...props
}) => {
	const { totalHeaderHeight } = useHeader();
	const { height } = useWindowDimensions();

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			snapPoints={[height - totalHeaderHeight]}
			customHandle={() => null}
			enablePanDownToClose={false}
			enableContentPanningGesture={false}
			borderRadius={false}
			contentContainerStyle={{ flex: 1 }}
			{...props}
		>
			<ScrollView contentContainerStyle={{ flex: 1 }}>{children}</ScrollView>
		</BottomSheet>
	);
};

export default FullScreenBottomSheet;
