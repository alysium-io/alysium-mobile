import { useQRCodeSize, useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';
import RNQRCode from 'react-native-qrcode-styled';

type QRCodeProps = Props<typeof RNQRCode> & {
	size?: number;
};

const QRCode: React.FC<QRCodeProps> = ({ size = 0.5, ...props }) => {
	const { theme } = useTheme();
	const qrCodeSizes = useQRCodeSize(size);
	return (
		<RNQRCode
			style={[
				styles.svg,
				{
					backgroundColor: 'transparent'
				}
			]}
			color={theme.colors['text.p']}
			{...qrCodeSizes}
			{...props}
		/>
	);
};

const styles = StyleSheet.create({
	svg: {
		overflow: 'hidden'
	}
});

export default QRCode;
