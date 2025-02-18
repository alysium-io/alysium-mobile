import { useQRCodeSize, useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';

type QRCodeProps = Props<typeof QRCodeStyled> & {
	size?: number; // height/width of each piece
};

const QRCode: React.FC<QRCodeProps> = ({ data, size = 3, ...props }) => {
	const { theme } = useTheme();
	const sizes = useQRCodeSize(size);

	return (
		<QRCodeStyled
			data={data}
			style={styles.svg}
			isPiecesGlued
			color={theme.colors['text.p']}
			{...sizes}
			{...props}
		/>
	);
};

const styles = StyleSheet.create({
	svg: {
		backgroundColor: 'transparent',
		overflow: 'hidden'
	}
});

export default QRCode;
