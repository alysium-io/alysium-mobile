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

const useQRCodeSize = (coefficient: number = 1): QRCodeProps => {
	return useMemo(
		() => ({
			padding: 16 * coefficient,
			pieceSize: 6 * coefficient,
			pieceBorderRadius: 3 * coefficient,
			outerEyesOptions: {
				topLeft: {
					borderRadius: [
						16 * coefficient,
						16 * coefficient,
						0,
						16 * coefficient
					]
				},
				topRight: {
					borderRadius: [16 * coefficient, 16 * coefficient, 16 * coefficient]
				},
				bottomLeft: {
					borderRadius: [
						16 * coefficient,
						0,
						16 * coefficient,
						16 * coefficient
					]
				}
			},
			innerEyesOptions: {
				borderRadius: 9 * coefficient,
				scale: 0.85
			}
		}),
		[coefficient]
	);
};

export default useQRCodeSize;
