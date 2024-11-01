import { SkeletonPlaceholder, View } from '@atomic';
import { Image } from '@flux/api/media';
import { useImage, usePriorityImage } from '@hooks';
import React from 'react';
import { Case, Default, Switch } from 'react-if';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

type ComplexImageProps = React.ComponentProps<typeof Animated.Image> & {
	image?: Image | null;
};

const ComplexImage: React.FC<ComplexImageProps> = ({ image, ...props }) => {
	const { urlForKey } = useImage();
	const { currentUrl } = usePriorityImage([
		urlForKey(image?.small?.key),
		urlForKey(image?.medium?.key),
		urlForKey(image?.large?.key)
	]);

	return (
		<View>
			<Switch>
				<Case condition={!image}>
					<View style={styles.container} backgroundColor='bg.q' />
				</Case>
				<Case condition={!currentUrl}>
					<SkeletonPlaceholder>
						<View style={styles.container} />
					</SkeletonPlaceholder>
				</Case>
				<Default>
					<Animated.Image
						source={{ uri: currentUrl }}
						style={styles.container}
						resizeMode='cover'
						{...props}
					/>
				</Default>
			</Switch>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%'
	}
});

export default ComplexImage;
