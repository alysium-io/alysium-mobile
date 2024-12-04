import { useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';
import RNQRCode from 'react-native-qrcode-svg';

type QRCodeProps = Props<typeof RNQRCode> & {};

const QRCode: React.FC<QRCodeProps> = ({ ...props }) => {
	const { theme } = useTheme();
	return (
		<RNQRCode
			backgroundColor={theme.colors['bg.p']}
			color={theme.colors['text.s']}
			{...props}
		/>
	);
};

export default QRCode;
