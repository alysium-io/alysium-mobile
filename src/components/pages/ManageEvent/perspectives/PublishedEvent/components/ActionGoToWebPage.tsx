import { useHyperlink } from '@hooks';
import { MenuListItem } from '@molecules';
import { NanoId } from '@types';
import React from 'react';
import { Linking } from 'react-native';

interface ActionGoToWebPageProps {
	event_uid: NanoId;
}

const ActionGoToWebPage: React.FC<ActionGoToWebPageProps> = ({ event_uid }) => {
	const { eventPageHyperlink } = useHyperlink();
	const onViewWebPage = () => {
		Linking.openURL(eventPageHyperlink(event_uid));
	};

	return (
		<MenuListItem
			onPress={onViewWebPage}
			prefixIconProps={{
				name: 'chrome',
				size: 'm'
			}}
			titleTextProps={{
				title: 'Web Page',
				bottomSubtext: 'View your event page on the web',
				titleVariant: 'paragraph',
				bottomSubtextColor: 'text.q'
			}}
		/>
	);
};

export default ActionGoToWebPage;
