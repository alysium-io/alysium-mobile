import { View } from '@atomic';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { BottomSheet, useAnimatedFooterHeight } from '@organisms';
import React from 'react';
import Header from './components/Header';
import SearchType from './components/SearchType';

interface SearchFiltersBottomSheetProps {
	sheetApi: SheetApi;
}

const SearchFiltersBottomSheet: React.FC<SearchFiltersBottomSheetProps> = ({
	sheetApi
}) => {
	const { animatedMarginBottom } = useAnimatedFooterHeight();

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			snapPoints={['90%']}
			handleComponent={null}
		>
			<BottomSheetView style={[{ flex: 1 }, animatedMarginBottom]}>
				<Header />
				<View margin='m'>
					<SearchType />
				</View>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default SearchFiltersBottomSheet;
