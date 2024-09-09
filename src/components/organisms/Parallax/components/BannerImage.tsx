import { Icon, Image, View } from '@atomic';
import { useTheme } from '@hooks';
import { IconNames } from '@svg';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
	interpolate,
	SharedValue,
	useAnimatedStyle
} from 'react-native-reanimated';
import { useEnvContext } from 'src/utils/contexts';

interface BannerImageProps {
	image?: string;
	defaultIcon?: IconNames;
	scrollY: SharedValue<number>;
	bannerImageHeight: number;
}

const BannerImage: React.FC<BannerImageProps> = ({
	image,
	defaultIcon = 'artist',
	scrollY,
	bannerImageHeight
}) => {
	const { env } = useEnvContext();
	const { theme } = useTheme();

	const animatedContainerStyle = useAnimatedStyle(() => {
		return {
			height: interpolate(
				scrollY.value,
				[0, bannerImageHeight],
				[bannerImageHeight, 0],
				{
					extrapolateLeft: 'extend',
					extrapolateRight: 'clamp'
				}
			)
		};
	}, [bannerImageHeight]);

	const animatedImageStyle = useAnimatedStyle(() => {
		return {
			opacity: scrollY.value > bannerImageHeight ? 0 : 1
		};
	}, [bannerImageHeight]);

	return (
		<View
			animated
			position='absolute'
			borderColor='border.medium'
			style={[
				animatedContainerStyle,
				{ width: '100%', borderBottomWidth: theme.borderWidth.normal }
			]}
		>
			<View height='100%' animated style={animatedImageStyle}>
				{image ? (
					<Image
						source={{ uri: env.imagesBaseUrl + image }}
						style={styles.image}
					/>
				) : (
					<View
						height='100%'
						width='100%'
						backgroundColor='bg.s'
						justifyContent='center'
						alignItems='center'
					>
						<Icon name={defaultIcon} size='xl' color='text.s' />
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		height: '100%',
		width: '100%'
	}
});

export default BannerImage;
