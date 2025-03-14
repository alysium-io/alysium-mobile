import { DefaultImage, Icon, Image, Text, View } from '@atomic';
import { useImage, useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';
import { Case, Default, Switch } from 'react-if';
import { StyleSheet } from 'react-native';
import Animated, {
	Extrapolation,
	interpolate,
	SharedValue,
	useAnimatedStyle
} from 'react-native-reanimated';
import { BANNER_IMAGE_HEIGHT } from '../settings';

type ParallaxViewProps = {
	title?: string;
	image?: string;
	titleTextProps?: Props<typeof Text>;
	defaultIconProps?: Props<typeof Icon>;
	CustomImage?: React.FC;
	HeaderComponent: React.FC;
	scrollOffset: SharedValue<number>;
};

const ParallaxView: React.FC<ParallaxViewProps> = ({
	title,
	image,
	titleTextProps,
	defaultIconProps,
	CustomImage,
	HeaderComponent,
	scrollOffset
}) => {
	const { theme } = useTheme();
	const { urlForKey } = useImage();

	const imageAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-BANNER_IMAGE_HEIGHT, 0, BANNER_IMAGE_HEIGHT],
						[-BANNER_IMAGE_HEIGHT / 2, 0, BANNER_IMAGE_HEIGHT * 0.75]
					)
				},
				{
					scale: interpolate(
						scrollOffset.value,
						[-BANNER_IMAGE_HEIGHT, 0, BANNER_IMAGE_HEIGHT],
						[2, 1, 1]
					)
				}
			]
		};
	}, []);

	const imageTitleStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				scrollOffset.value,
				[0, BANNER_IMAGE_HEIGHT * 0.8],
				[1, 0],
				Extrapolation.CLAMP
			)
		};
	}, []);

	return (
		<>
			<Animated.View style={[styles.imageContainer, imageAnimatedStyle]}>
				<Switch>
					<Case condition={CustomImage !== undefined}>
						{CustomImage && <CustomImage />}
					</Case>
					<Case condition={image}>
						<Image source={{ uri: urlForKey(image) }} style={styles.image} />
					</Case>
					<Default>
						<DefaultImage iconProps={defaultIconProps} />
					</Default>
				</Switch>
			</Animated.View>
			<Animated.View style={[styles.titleContainer, imageTitleStyle]}>
				<Text
					variant='page-header'
					color={image ? 'palette.neutral.p1' : 'text.p'}
					padding='m'
					width='100%'
					style={[styles.title, image ? styles.titleShadow : undefined]}
					adjustsFontSizeToFit
					numberOfLines={1}
					maxFontSizeMultiplier={1.2}
					minimumFontScale={0.6}
					{...titleTextProps}
				>
					{title}
				</Text>
			</Animated.View>
			<View
				borderTopColor='border.medium'
				borderTopWidth={theme.borderWidth.thick}
				backgroundColor='bg.p'
			>
				<HeaderComponent />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	imageContainer: {
		width: '100%',
		height: BANNER_IMAGE_HEIGHT
	},
	image: {
		height: '100%',
		width: '100%'
	},
	titleContainer: {
		width: '100%',
		height: BANNER_IMAGE_HEIGHT,
		position: 'absolute'
	},
	title: {
		position: 'absolute',
		bottom: 0
	},
	titleShadow: {
		textShadowColor: 'rgba(0, 0, 0, 0.25)',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 10
	}
});

export default ParallaxView;
