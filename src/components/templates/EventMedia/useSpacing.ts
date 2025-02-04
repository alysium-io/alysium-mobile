import { useLayoutDimensions } from '@hooks';
import { LayoutChangeEvent } from 'react-native';

interface IUseSpacing {
	gap: number;
	squaresPerRow: number;
	numGaps: number;
	totalGapWidth: number;
	squareWidth: number;
	onLayout: (event: LayoutChangeEvent) => void;
}

const useSpacing = (): IUseSpacing => {
	const { dimensions, onLayout } = useLayoutDimensions();
	const gap = 0.5;
	const squaresPerRow = 3;
	const numGaps = squaresPerRow - 1;
	const totalGapWidth = numGaps * gap;
	const squareWidth = (dimensions.width - totalGapWidth) / squaresPerRow;

	return {
		gap,
		squaresPerRow,
		numGaps,
		totalGapWidth,
		squareWidth,
		onLayout
	};
};

export default useSpacing;
