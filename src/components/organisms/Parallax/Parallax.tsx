import { View } from '@atomic';
import { useScrollView, useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';
import { ScrollView } from 'react-native';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import BannerImage from './components/BannerImage';
import BannerTitle from './components/BannerTitle';
import useParallax from './useParallax';

interface ParallaxProps {
	children?: React.ReactNode;
	bannerImageProps: Omit<
		Props<typeof BannerImage>,
		'scrollY' | 'bannerImageHeight'
	>;
	bannerTitleProps: Props<typeof BannerTitle>;
	CustomBackground?: React.FC;
}

const Parallax: React.FC<ParallaxProps> = ({
	children,
	bannerImageProps,
	bannerTitleProps,
	CustomBackground
}) => {
	const { theme } = useTheme();
	const { scrollY, scrollEvent } = useScrollView();
	const { bannerImageHeight } = useParallax();

	const animatedTitleStyles = useAnimatedStyle(() => {
		return { opacity: interpolate(scrollY.value, [0, 100], [1, 0], 'clamp') };
	}, []);

	return (
		<View flex={1}>
			<BannerImage
				scrollY={scrollY}
				bannerImageHeight={bannerImageHeight}
				CustomBackground={CustomBackground}
				{...bannerImageProps}
			/>
			<ScrollView
				alwaysBounceVertical
				onScroll={scrollEvent}
				scrollEventThrottle={16}
				showsVerticalScrollIndicator={false}
			>
				<View animated height={bannerImageHeight} style={animatedTitleStyles}>
					<BannerTitle
						{...bannerTitleProps}
						showGradient={
							bannerTitleProps.showGradient !== undefined
								? bannerTitleProps.showGradient
								: bannerImageProps.image !== undefined
						}
					/>
				</View>
				<View
					backgroundColor='bg.p'
					borderTopWidth={theme.borderWidth.normal}
					borderTopColor='border.medium'
				>
					{children}
				</View>
			</ScrollView>
		</View>
	);
};

export default Parallax;
