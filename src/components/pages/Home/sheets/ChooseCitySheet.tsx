import { Text, View } from '@atomic';
import { locationApiSlice } from '@flux/api/location';
import { GoogleMapsAutocompleteResult } from '@flux/api/location/types';
import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useSearch } from '@hooks';
import { MenuListItem } from '@molecules';
import { BottomSheet, SearchBar } from '@organisms';
import { useCurrentLocationContext } from '@src/utils/contexts';
import { ContentListItemsLoading } from '@templates';
import React from 'react';
import { Case, Switch } from 'react-if';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ChooseCitySheetProps {
	sheetApi: SheetApi;
	onChooseCity: (
		city: GoogleMapsAutocompleteResult | 'CurrentLocation'
	) => void;
}

const ChooseCitySheet: React.FC<ChooseCitySheetProps> = ({
	sheetApi,
	onChooseCity
}) => {
	const { hasLocation, city, country } = useCurrentLocationContext();
	const insets = useSafeAreaInsets();
	const searchApi = useSearch();
	const { data, isFetching, isSuccess } =
		locationApiSlice.useAutocompleteSceneQuery({
			body: {
				searchText: searchApi.searchText
			}
		});

	const sheetDidOpen = () => {
		searchApi.pressActivate();
	};

	const CurrentLocationMenuItem = () => {
		if (!hasLocation) return null;
		let subtitle = city?.long_name;
		if (subtitle && country?.short_name) {
			subtitle = `${subtitle}, ${country.short_name}`;
		} else if (!subtitle && country?.long_name) {
			subtitle = country?.long_name;
		} else {
			subtitle = 'Unknown City';
		}
		return (
			<MenuListItem
				prefixIconProps={{
					name: 'location',
					size: 'm'
				}}
				titleTextProps={{
					title: 'Current Location',
					bottomSubtext: subtitle,
					bottomSubtextColor: 'text.q'
				}}
				containerProps={{
					paddingLeft: 's'
				}}
				onPress={() => onChooseCity('CurrentLocation')}
			/>
		);
	};

	return (
		<BottomSheet
			ref={sheetApi.sheetRef}
			snapPoints={['90%']}
			sheetDidOpen={sheetDidOpen}
		>
			<BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom }}>
				<View margin='m'>
					<SearchBar searchApi={searchApi} placeholder='Search by City' />
				</View>
				<BottomSheetScrollView
					style={{ flex: 1 }}
					keyboardDismissMode='on-drag'
					keyboardShouldPersistTaps='always'
				>
					<Switch>
						<Case condition={searchApi.searchText.length === 0}>
							{hasLocation ? (
								<CurrentLocationMenuItem />
							) : (
								<Text variant='paragraph' color='text.s' textAlign='center'>
									Search by <Text variant='paragraph-medium'>City</Text>
								</Text>
							)}
						</Case>
						<Case condition={isFetching}>
							<ContentListItemsLoading withImage={false} />
						</Case>
						<Case condition={isSuccess && !data?.length}>
							<Text variant='paragraph' color='text.s' textAlign='center'>
								No results found
							</Text>
						</Case>
						<Case condition={data?.length}>
							<CurrentLocationMenuItem />
							{data?.map((item) => (
								<MenuListItem
									key={item.place_id}
									titleTextProps={{
										title: item.main_text,
										bottomSubtext: item.secondary_text,
										bottomSubtextColor: 'text.q'
									}}
									containerProps={{
										paddingLeft: 's'
									}}
									onPress={() => onChooseCity(item)}
								/>
							))}
						</Case>
					</Switch>
				</BottomSheetScrollView>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default ChooseCitySheet;
