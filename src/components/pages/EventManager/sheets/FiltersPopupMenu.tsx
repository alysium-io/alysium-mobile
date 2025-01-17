import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { SingleOptionRadioToggler } from '@molecules';
import { BottomSheet } from '@organisms';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FiltersPopupMenuBotto {
	sheetApi: SheetApi;
	eventsView: string;
	setEventsView: (id: string) => void;
}

const FiltersPopupMenu: React.FC<FiltersPopupMenuBotto> = ({
	sheetApi,
	eventsView,
	setEventsView
}) => {
	const insets = useSafeAreaInsets();

	return (
		<BottomSheet ref={sheetApi.sheetRef} enableDynamicSizing>
			<BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom + 25 }}>
				<SingleOptionRadioToggler
					defaultId={eventsView}
					onChange={(id) => {
						setEventsView(id);
						sheetApi.close();
					}}
					items={[
						{
							id: 'workbench',
							titleTextProps: {
								title: 'Working On',
								titleVariant: 'paragraph',
								bottomSubtext: 'Drafts and events coming up.',
								bottomSubtextColor: 'text.q'
							}
						},
						{
							id: 'archive',
							titleTextProps: {
								title: 'Archived',
								titleVariant: 'paragraph',
								bottomSubtext: 'Historical record of completed events.',
								bottomSubtextColor: 'text.q'
							}
						}
					]}
				/>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default FiltersPopupMenu;
