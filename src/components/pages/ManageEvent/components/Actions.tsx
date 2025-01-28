import { Section, Text } from '@atomic';
import React from 'react';
import ActionCopyAddress from '../perspectives/PublishedEvent/components/ActionCopyAddress';
import ActionCopyEventLink from '../perspectives/PublishedEvent/components/ActionCopyEventLink';
import ActionCopyTime from '../perspectives/PublishedEvent/components/ActionCopyTime';
import ActionGoToWebPage from '../perspectives/PublishedEvent/components/ActionGoToWebPage';

interface ActionsProps {
	event_uid: string;
}

const Actions: React.FC<ActionsProps> = ({ event_uid }) => {
	return (
		<Section>
			<Text variant='section-header-2' marginHorizontal='m'>
				Actions
			</Text>
			<ActionCopyEventLink event_uid={event_uid} />
			<ActionCopyAddress event_uid={event_uid} />
			<ActionCopyTime event_uid={event_uid} />
			<ActionGoToWebPage event_uid={event_uid} />
		</Section>
	);
};

export default Actions;
