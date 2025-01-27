import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useNavigation, useSheet } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import { ComplexEventStatusIndicator } from '@templates';
import React from 'react';
import PopupMenuSheet from '../sheets/PopupMenuSheet/PopupMenuSheet';

interface PublicEventHeaderProps {
	event?: EventLink;
}

const PublicEventHeader: React.FC<PublicEventHeaderProps> = ({ event }) => {
	const { back } = useNavigation();
	const sheetApi = useSheet();

	if (!event) return null;

	return (
		<>
			<Header>
				<HeaderSection
					LeftComponent={<HeaderIconButton onPress={back} name='arrow-left' />}
					CenterComponent={
						<HeaderTitle
							title={<ComplexEventStatusIndicator event={event?.event} />}
						/>
					}
					RightComponent={
						<HeaderIconButton onPress={sheetApi.open} name='menu' />
					}
				/>
			</Header>
			<PopupMenuSheet event_uid={event?.event.event_uid} sheetApi={sheetApi} />
		</>
	);
};

export default PublicEventHeader;
