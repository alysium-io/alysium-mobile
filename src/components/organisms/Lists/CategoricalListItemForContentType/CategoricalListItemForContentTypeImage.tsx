import { Icon, View } from '@atomic';
import { useTheme } from '@hooks';
import { IconNames } from '@svg';
import { ContentType, ThemeMode } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';

const colorScheme = {
	[ThemeMode.light]: {
		[ContentType.artist]: {
			background: 'matt',
			icon: 'matt_light'
		},
		[ContentType.host]: {
			background: 'haze',
			icon: 'haze_light'
		},
		[ContentType.tag]: {
			background: 'ion',
			icon: 'ion_light'
		},
		[ContentType.location]: {
			background: 'meteor',
			icon: 'meteor_light'
		}
	},
	[ThemeMode.dark]: {
		[ContentType.artist]: {
			background: 'matt_dark',
			icon: 'matt_light'
		},
		[ContentType.host]: {
			background: 'haze_dark',
			icon: 'haze_light'
		},
		[ContentType.tag]: {
			background: 'ion_dark',
			icon: 'ion_light'
		},
		[ContentType.location]: {
			background: 'meteor_dark',
			icon: 'meteor_light'
		}
	}
};

// Map the ContentType to the icon name
const iconScheme = {
	[ContentType.artist]: 'artist' as IconNames,
	[ContentType.host]: 'host' as IconNames,
	[ContentType.tag]: 'tag' as IconNames,
	[ContentType.location]: 'location' as IconNames
};

interface CategoricalListItemForContentTypeImageProps {
	contentType:
		| ContentType.artist
		| ContentType.host
		| ContentType.tag
		| ContentType.location;
}

const CategoricalListItemForContentTypeImage: React.FC<
	CategoricalListItemForContentTypeImageProps
> = ({ contentType }) => {
	const { mode } = useTheme();

	return (
		<View
			style={styles.container}
			backgroundColor={colorScheme[mode][contentType]['background']}
		>
			<Icon
				name={iconScheme[contentType]}
				color={colorScheme[mode][contentType]['icon']}
				size='large'
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 67,
		aspectRatio: 1,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default CategoricalListItemForContentTypeImage;
