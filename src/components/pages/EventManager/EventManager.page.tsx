import { View } from '@atomic';
import { useSheet } from '@hooks';
import { Button } from '@molecules';
import { BasePage } from '@organisms';
import { CreateArtistEventBottomSheet } from '@popups';
import React, { useCallback, useState } from 'react';
import { Case, Switch } from 'react-if';
import ArchiveView from './components/ArchiveView';
import WorkbenchView from './components/WorkbenchView';
import EventManagerPageHeader from './EventManager.header';
import FiltersPopupMenu from './sheets/FiltersPopupMenu';

const EventManagerPage: React.FC = () => {
	const filtersPopupMenuSheetApi = useSheet();
	const createArtistEventSheetApi = useSheet();
	const [eventsView, setEventsView] = useState<string>('workbench');

	const FooterComponent = useCallback(
		() => (
			<View margin='m'>
				<Button
					text='Create Event'
					color='p'
					onPress={createArtistEventSheetApi.open}
				/>
				<CreateArtistEventBottomSheet sheetApi={createArtistEventSheetApi} />
			</View>
		),
		[createArtistEventSheetApi]
	);

	return (
		<BasePage FooterComponent={FooterComponent}>
			<EventManagerPageHeader
				eventsView={eventsView}
				onPressFilters={filtersPopupMenuSheetApi.open}
			/>
			<Switch>
				<Case condition={eventsView === 'workbench'}>
					<WorkbenchView />
				</Case>
				<Case condition={eventsView === 'archive'}>
					<ArchiveView />
				</Case>
			</Switch>
			<FiltersPopupMenu
				sheetApi={filtersPopupMenuSheetApi}
				eventsView={eventsView}
				setEventsView={setEventsView}
			/>
		</BasePage>
	);
};

export default EventManagerPage;
