import { useMemo } from 'react';

type QRCodeProps = {
	padding: number;
	pieceSize: number;
	pieceBorderRadius: number;
	outerEyesOptions: {
		topLeft: { borderRadius: number[] };
		topRight: { borderRadius: number[] };
		bottomLeft: { borderRadius: number[] };
	};
	innerEyesOptions: {
		borderRadius: number;
		scale: number;
	};
};

const useQRCodeSize = (size: number): QRCodeProps => {
	return useMemo(() => {
		const borderRadius = size / 2;
		const eyeBorder = size * 2.5;

		return {
			padding: 0,
			pieceSize: size,
			pieceBorderRadius: borderRadius,
			outerEyesOptions: {
				topLeft: {
					borderRadius: [eyeBorder, eyeBorder, 0, eyeBorder]
				},
				topRight: {
					borderRadius: [eyeBorder, eyeBorder, eyeBorder]
				},
				bottomLeft: {
					borderRadius: [eyeBorder, 0, eyeBorder, eyeBorder]
				}
			},
			innerEyesOptions: {
				borderRadius: eyeBorder * 0.6,
				scale: 0.85
			}
		};
	}, [size]);
};

export default useQRCodeSize;
