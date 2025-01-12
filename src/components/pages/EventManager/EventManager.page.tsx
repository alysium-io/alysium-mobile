import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { usePagination, useSheet } from '@hooks';
import { Button } from '@molecules';
import { BasePage } from '@organisms';
import { CreateArtistEventBottomSheet } from '@popups';
import React, { useCallback, useState } from 'react';
import ArchiveView from './components/ArchiveView';
import LoadingView from './components/LoadingView';
import WorkbenchView from './components/WorkbenchView';
import EventManagerPageHeader from './EventManager.header';
import FiltersPopupMenu from './sheets/FiltersPopupMenu';

const EventManagerPage: React.FC = () => {
	const filtersPopupMenuSheetApi = useSheet();
	const { artistData } = useArtistAppContext();
	const createArtistEventSheetApi = useSheet();
	const [eventsView, setEventsView] = useState<string>('workbench');

	const { data: workbenchData, isLoading: isLoadingWorkbench } =
		artistEventApiSlice.useWorkbenchQuery({
			params: {
				artist_uid: artistData.artist_uid
			}
		});

	const { page, defaultLimit } = usePagination();
	const { data: archiveData, isLoading: isLoadingArchive } =
		artistEventApiSlice.useArchiveQuery({
			params: {
				artist_uid: artistData.artist_uid
			},
			query: {
				page,
				limit: defaultLimit
			}
		});

	const isCurrentViewLoading =
		(isLoadingWorkbench && eventsView === 'workbench') ||
		(isLoadingArchive && eventsView === 'archive');

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
			{isCurrentViewLoading && <LoadingView />}
			{eventsView === 'workbench' && <WorkbenchView events={workbenchData} />}
			{eventsView === 'archive' && <ArchiveView events={archiveData} />}
			<FiltersPopupMenu
				sheetApi={filtersPopupMenuSheetApi}
				eventsView={eventsView}
				setEventsView={setEventsView}
			/>
		</BasePage>
	);
};

export default EventManagerPage;
