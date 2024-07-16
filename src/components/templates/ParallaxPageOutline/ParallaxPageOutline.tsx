import { Image, LinearGradient, Text, View } from '@atomic';
import { useScrollView } from '@hooks';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import settings from './settings';

interface ParallaxPageOutlineProps {
	children?: React.ReactNode;
	image?: string;
	title: string;
	textAlignment?: 'left' | 'center';
}

const ParallaxPageOutline: React.FC<ParallaxPageOutlineProps> = ({
	children,
	image,
	title,
	textAlignment = 'left'
}) => {
	const { scrollY, scrollEvent } = useScrollView();
	const insets = useSafeAreaInsets();

	const animatedMainImageContainerStyles = useAnimatedStyle(() => {
		return {
			height:
				settings.ARTIST_PAGE_TOTAL_HEADER_HEIGHT + insets.top - scrollY.value
		};
	}, []);

	const animatedMainImageStyles = useAnimatedStyle(() => {
		return { height: settings.ARTIST_PAGE_MAIN_IMAGE_HEIGHT - scrollY.value };
	}, []);

	const animatedTitleStyles = useAnimatedStyle(() => {
		return { opacity: interpolate(scrollY.value, [0, -100], [1, 0], 'clamp') };
	}, []);

	return (
		<>
			<View
				animated
				style={[styles.mainImageContainer, animatedMainImageContainerStyles]}
			>
				<Image
					animated
					source={{
						uri: image,
						priority: FastImage.priority.high
					}}
					resizeMode={FastImage.resizeMode.cover}
					style={[styles.mainImage, animatedMainImageStyles]}
				/>
				<View animated style={[styles.mainImageTextLayer, animatedTitleStyles]}>
					<LinearGradient
						colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.3)']}
						style={[styles.titleGradientContainer]}
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 1 }}
					>
						<Text
							variant='page-header'
							margin='m'
							numberOfLines={1}
							textAlign={textAlignment}
							color='palette.neutral.p1'
						>
							{title}
						</Text>
					</LinearGradient>
				</View>
			</View>
			<ScrollView
				contentContainerStyle={[
					styles.scrollView,
					{ paddingTop: settings.ARTIST_PAGE_TOTAL_HEADER_HEIGHT + insets.top }
				]}
				alwaysBounceVertical
				onScroll={scrollEvent}
				scrollEventThrottle={16}
			>
				{children}
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	mainImageContainer: {
		position: 'absolute',
		width: '100%'
	},
	mainImage: {
		position: 'absolute',
		height: settings.ARTIST_PAGE_MAIN_IMAGE_HEIGHT,
		width: '100%',
		bottom: 0
	},
	mainImageTextLayer: {
		position: 'absolute',
		bottom: 0,
		height: settings.ARTIST_PAGE_MAIN_IMAGE_HEIGHT / 3,
		width: '100%'
	},
	titleGradientContainer: {
		height: '100%',
		width: '100%',
		justifyContent: 'flex-end'
	},
	scrollView: {
		overflow: 'visible',
		flexGrow: 1
	},
	imgShadowGradient: {
		position: 'absolute',
		height: 100,
		width: '100%'
	},
	mainContentBackgroundGradient: {
		position: 'absolute',
		height: '50%',
		width: '100%'
	}
});

export default ParallaxPageOutline;
