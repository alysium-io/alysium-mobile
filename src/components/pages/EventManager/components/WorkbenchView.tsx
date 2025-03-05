import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { RefreshControl, ScrollView, Text } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { useRefresh, useSplitEventsByComplexStatus, withPoke } from '@hooks';
import { PageError } from '@templates';
import React from 'react';
import EmptyState from './EmptyState';
import LoadingView from './LoadingView';
import WorkbenchSection from './WorkbenchSection';

interface WorkbenchViewProps {}

const WorkbenchView: React.FC<WorkbenchViewProps> = () => {
	const { artistData } = useArtistAppContext();
	let { data, isLoading, refetch, error } =
		artistEventApiSlice.useWorkbenchQuery({
			params: {
				artist_uid: artistData.artist_uid
			}
		});
	const { getSections, sections } = useSplitEventsByComplexStatus(data);
	const refreshControl = useRefresh(refetch);

	withPoke({
		interval: 1,
		enabled: true,
		checkFn: getSections,
		name: 'Workbench'
	});

	if (error) {
		return <PageError error={error} withHeader={false} />;
	}

	if (isLoading) {
		return <LoadingView />;
	}

	if (!data?.length) {
		return (
			<EmptyState
				title={
					<Text variant='paragraph-medium' color='text.q' textAlign='center'>
						Create an{' '}
						<Text variant='paragraph-medium' color='text.s'>
							event
						</Text>{' '}
						to get started
					</Text>
				}
				refetch={refetch}
			/>
		);
	}

	return (
		<ScrollView refreshControl={<RefreshControl {...refreshControl} />}>
			{sections.map((section) => {
				if (!section.events?.length) return null;

				return (
					<WorkbenchSection
						key={section.id}
						sectionType={section.id}
						title={section.title}
						events={section.events}
					/>
				);
			})}
		</ScrollView>
	);
};

export default WorkbenchView;
