import { QRCode, View } from '@atomic';
import { useHyperlink } from '@hooks';
import { NanoId } from '@types';
import React from 'react';

interface ShareQRCodeProps {
	event_uid: NanoId;
}

const ShareQRCode: React.FC<ShareQRCodeProps> = ({ event_uid }) => {
	const { eventPageHyperlink } = useHyperlink();
	return (
		<View margin='m' alignItems='center'>
			<QRCode data={eventPageHyperlink(event_uid)} />
		</View>
	);
};

export default ShareQRCode;
