import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { SingleOptionRadioToggler } from '@molecules';
import { BottomSheet } from '@organisms';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EventManagerView } from '../EventManager.page';

interface FiltersPopupMenuBottomSheetProps {
	sheetApi: SheetApi;
	eventsView: EventManagerView;
	setEventsView: (id: EventManagerView) => void;
}

const FiltersPopupMenu: React.FC<FiltersPopupMenuBottomSheetProps> = ({
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
							id: EventManagerView.working_on,
							titleTextProps: {
								title: 'Working On',
								titleVariant: 'paragraph',
								bottomSubtext: 'Drafts and events coming up.',
								bottomSubtextColor: 'text.q'
							}
						},
						{
							id: EventManagerView.ended,
							titleTextProps: {
								title: 'Ended',
								titleVariant: 'paragraph',
								bottomSubtext: 'Events that have ended.',
								bottomSubtextColor: 'text.q'
							}
						},
						{
							id: EventManagerView.epk,
							titleTextProps: {
								title: 'EPK',
								titleVariant: 'paragraph',
								bottomSubtext: 'Completed events that show on your profile.',
								bottomSubtextColor: 'text.q'
							}
						},
						{
							id: EventManagerView.all,
							titleTextProps: {
								title: 'All',
								titleVariant: 'paragraph',
								bottomSubtext: 'All events.',
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
