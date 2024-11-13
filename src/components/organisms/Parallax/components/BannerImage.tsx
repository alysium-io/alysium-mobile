import { Icon, Image, View } from '@atomic';
import { useImage } from '@hooks';
import { IconNames } from '@svg';
import React from 'react';
import { Case, Default, Switch } from 'react-if';
import { StyleSheet } from 'react-native';
import {
	interpolate,
	SharedValue,
	useAnimatedStyle
} from 'react-native-reanimated';

interface BannerImageProps {
	image?: string;
	defaultIcon?: IconNames;
	scrollY: SharedValue<number>;
	bannerImageHeight: number;
	CustomBackground?: React.FC;
}

const BannerImage: React.FC<BannerImageProps> = ({
	image,
	defaultIcon = 'artist',
	scrollY,
	bannerImageHeight,
	CustomBackground
}) => {
	const { urlForKey } = useImage();

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
			style={[animatedContainerStyle, { width: '100%' }]}
		>
			<View height='100%' animated style={animatedImageStyle}>
				<Switch>
					<Case condition={CustomBackground !== undefined}>
						{/** react-if does not catch type check for undefined values YAY! */}
						{CustomBackground && <CustomBackground />}
					</Case>
					<Case condition={image}>
						<Image source={{ uri: urlForKey(image) }} style={styles.image} />
					</Case>
					<Default>
						<View
							height='100%'
							width='100%'
							backgroundColor='bg.light'
							justifyContent='center'
							alignItems='center'
						>
							<Icon name={defaultIcon} size='xl' color='text.s' />
						</View>
					</Default>
				</Switch>
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
