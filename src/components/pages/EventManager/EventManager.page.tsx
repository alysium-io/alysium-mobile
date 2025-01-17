import { useSheet } from '@hooks';
import { BasePage } from '@organisms';
import React, { useState } from 'react';
import { Case, Switch } from 'react-if';
import ArchiveView from './components/ArchiveView';
import WorkbenchView from './components/WorkbenchView';
import EventManagerFooter from './EventManager.footer';
import EventManagerPageHeader from './EventManager.header';
import FiltersPopupMenu from './sheets/FiltersPopupMenu';

const EventManagerPage: React.FC = () => {
	const filtersPopupMenuSheetApi = useSheet();
	const [eventsView, setEventsView] = useState<string>('workbench');

	return (
		<BasePage FooterComponent={EventManagerFooter}>
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
