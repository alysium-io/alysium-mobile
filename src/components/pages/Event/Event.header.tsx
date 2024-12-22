import { Event } from '@flux/api/event';
import { useNavigation, useSheet } from '@hooks';
import { Header, HeaderIconButton, HeaderSection } from '@organisms';
import { ArtistEventPopupMenuBottomSheet } from '@popups';
import { ComplexEventStatusIndicator } from '@templates';
import { NanoId } from '@types';
import React from 'react';

interface EventPageHeaderProps {
	event_uid: NanoId;
	event?: Event;
}

const EventPageHeader: React.FC<EventPageHeaderProps> = ({
	event_uid,
	event
}) => {
	const { back } = useNavigation();
	const artistEventPopupMenuSheetApi = useSheet();
	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton onPress={back} name='arrow-left' />}
				CenterComponent={<ComplexEventStatusIndicator event={event} />}
				RightComponent={
					<HeaderIconButton
						name='menu'
						onPress={artistEventPopupMenuSheetApi.open}
					/>
				}
			/>
			<ArtistEventPopupMenuBottomSheet
				sheetApi={artistEventPopupMenuSheetApi}
				event_uid={event_uid}
			/>
		</Header>
	);
};

export default EventPageHeader;
