import { useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';

interface IUseLayoutDimensions {
	dimensions: LayoutRectangle | null;
	onLayout: (e: LayoutChangeEvent) => void;
}

const useLayoutDimensions = (): IUseLayoutDimensions => {
	const [dimensions, setDimensions] = useState<LayoutRectangle | null>(null);
	const onLayout = (e: LayoutChangeEvent) =>
		setDimensions(e.nativeEvent.layout);

	return {
		dimensions,
		onLayout
	};
};

export default useLayoutDimensions;
