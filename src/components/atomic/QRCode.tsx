import { useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';
import RNQRCode from 'react-native-qrcode-svg';

type QRCodeProps = Props<typeof RNQRCode> & {};

const QRCode: React.FC<QRCodeProps> = ({ ...props }) => {
	const { theme } = useTheme();
	return (
		<RNQRCode
			linearGradient={[
				theme.colors['text.s'],
				theme.colors['text.color.p.heavy']
			]}
			enableLinearGradient
			{...props}
		/>
	);
};

export default QRCode;
