import { useLayoutDimensions } from '@hooks';
import {
	BlurStyle,
	Canvas,
	Circle,
	PaintStyle,
	Skia
} from '@shopify/react-native-skia';
import React, { useEffect } from 'react';
import {
	Easing,
	interpolate,
	useDerivedValue,
	useSharedValue,
	withRepeat,
	withTiming
} from 'react-native-reanimated';

interface LoaderProps {
	color?: string;
	size?: number;
}

const Loader: React.FC<LoaderProps> = ({ color = '#ffffff', size = 40 }) => {
	const { dimensions, onLayout } = useLayoutDimensions();
	const skiaColor = Skia.Color(color);
	const animatedValue = useSharedValue(0);

	const skiaSize = useDerivedValue(() =>
		interpolate(animatedValue.value, [0, 1], [size, size * 1.3])
	);

	const shadowPaint = useDerivedValue(() => {
		const shadow = Skia.Paint();
		shadow.setStyle(PaintStyle.Stroke);
		shadow.setColor(skiaColor);
		shadow.setStrokeWidth(10);
		shadow.setMaskFilter(
			Skia.MaskFilter.MakeBlur(
				BlurStyle.Normal,
				interpolate(animatedValue.value, [0, 1], [5, 7]),
				true
			)
		);
		shadow.setAlphaf(interpolate(animatedValue.value, [0, 1], [0.6, 0.7]));
		return shadow;
	}, []);

	const circlePaint = useDerivedValue(() => {
		const circle = Skia.Paint();
		circle.setStyle(PaintStyle.Stroke);
		circle.setColor(skiaColor);
		circle.setStrokeWidth(interpolate(animatedValue.value, [0, 1], [8, 5]));
		return circle;
	}, []);

	useEffect(() => {
		animatedValue.value = withRepeat(
			withTiming(1, {
				duration: 1200,
				easing: Easing.inOut(Easing.ease)
			}),
			-1,
			true
		);
		return () => {
			animatedValue.value = withTiming(1, {
				duration: 1000,
				easing: Easing.inOut(Easing.ease)
			});
		};
	}, [animatedValue]);

	return (
		<Canvas style={{ width: '100%', height: '100%' }} onLayout={onLayout}>
			{dimensions && (
				<>
					<Circle
						cx={dimensions.width / 2}
						cy={dimensions.height / 2}
						r={skiaSize}
						paint={shadowPaint}
					/>
					<Circle
						cx={dimensions.width / 2}
						cy={dimensions.height / 2}
						r={skiaSize}
						paint={circlePaint}
					/>
				</>
			)}
		</Canvas>
	);
};

export default Loader;
