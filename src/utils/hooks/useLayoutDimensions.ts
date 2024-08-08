import { useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';

interface IUseLayoutDimensions {
	dimensions: LayoutRectangle;
	onLayout: (e: LayoutChangeEvent) => void;
}

const useLayoutDimensions = (): IUseLayoutDimensions => {
	const [dimensions, setDimensions] = useState<LayoutRectangle>({
		x: 0,
		y: 0,
		width: 0,
		height: 0
	});
	const onLayout = (e: LayoutChangeEvent) => {
		if (
			e.nativeEvent.layout.width !== dimensions.width ||
			e.nativeEvent.layout.height !== dimensions.height ||
			e.nativeEvent.layout.x !== dimensions.x ||
			e.nativeEvent.layout.y !== dimensions.y
		) {
			setDimensions(e.nativeEvent.layout);
		}
	};

	return {
		dimensions,
		onLayout
	};
};

export default useLayoutDimensions;
