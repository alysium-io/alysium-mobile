import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useNavigation, useSheet } from '@hooks';
import { Header, HeaderIconButton, HeaderSection } from '@organisms';
import { ComplexEventStatusIndicator } from '@templates';
import React from 'react';
import ArtistEventPopupMenuSheet from './sheets/ArtistEventPopupMenuSheet';

interface EventPageHeaderProps {
	event?: EventLink;
}

const EventPageHeader: React.FC<EventPageHeaderProps> = ({ event }) => {
	const { back } = useNavigation();
	const artistEventPopupMenuSheetApi = useSheet();
	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton onPress={back} name='arrow-left' />}
				CenterComponent={<ComplexEventStatusIndicator event={event?.event} />}
				RightComponent={
					<HeaderIconButton
						name='menu'
						onPress={artistEventPopupMenuSheetApi.open}
					/>
				}
			/>
			{event && (
				<ArtistEventPopupMenuSheet
					sheetApi={artistEventPopupMenuSheetApi}
					event={event}
				/>
			)}
		</Header>
	);
};

export default EventPageHeader;
