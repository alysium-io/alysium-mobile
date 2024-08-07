import { Icon, Image, View } from '@atomic';
import { env } from '@etc';
import { IconNames } from '@svg';
import React from 'react';
import { StyleSheet } from 'react-native';

interface BannerImageProps {
	image?: string;
	defaultIcon?: IconNames;
}

const BannerImage: React.FC<BannerImageProps> = ({
	image,
	defaultIcon = 'artist'
}) => {
	return (
		<View height='100%'>
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
	);
};

const styles = StyleSheet.create({
	image: {
		height: '100%',
		width: '100%'
	}
});

export default BannerImage;
