import { View } from '@atomic';
import { useScrollView } from '@hooks';
import React from 'react';
import { ScrollView } from 'react-native';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import AnimatedParallaxBannerContainer from './components/AnimatedParallaxBannerContainer';
import BannerImage from './components/BannerImage';
import BannerTitle from './components/BannerTitle';
import useParallax from './useParallax';

interface ParallaxProps {
	children?: React.ReactNode;
	bannerImageProps: React.ComponentProps<typeof BannerImage>;
	bannerTitleProps: React.ComponentProps<typeof BannerTitle>;
}

const Parallax: React.FC<ParallaxProps> = ({
	children,
	bannerImageProps,
	bannerTitleProps
}) => {
	const { scrollY, scrollEvent } = useScrollView();
	const { bannerImageHeight } = useParallax();

	const animatedTitleStyles = useAnimatedStyle(() => {
		return { opacity: interpolate(scrollY.value, [0, 100], [1, 0], 'clamp') };
	}, []);

	return (
		<View flex={1}>
			<AnimatedParallaxBannerContainer
				scrollY={scrollY}
				bannerImageHeight={bannerImageHeight}
			>
				<BannerImage {...bannerImageProps} />
			</AnimatedParallaxBannerContainer>
			<ScrollView
				stickyHeaderHiddenOnScroll
				alwaysBounceVertical
				onScroll={scrollEvent}
				scrollEventThrottle={16}
			>
				<View animated height={bannerImageHeight} style={animatedTitleStyles}>
					<BannerTitle
						{...bannerTitleProps}
						showGradient={bannerImageProps.image !== undefined}
					/>
				</View>
				{children}
			</ScrollView>
		</View>
	);
};

export default Parallax;
