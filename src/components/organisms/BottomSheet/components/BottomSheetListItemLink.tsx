import { BgTouchAnimation, Icon, Text, View } from '@atomic';
import { useTheme } from '@hooks';
import { ThemeMode } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';

const colorScheme = {
	[ThemeMode.dark]: {
		backgroundHighlight: 'ion_dark'
	},
	[ThemeMode.light]: {
		backgroundHighlight: 'ion_light'
	}
};

interface BottomSheetListItemLinkProps {
	text: string;
	url: string;
	border?: boolean;
}

const BottomSheetListItemLink: React.FC<BottomSheetListItemLinkProps> = ({
	text,
	url,
	border = true
}) => {
	const { theme, getRawColor, mode } = useTheme();

	const onPress = () => {
		console.log('Going to: ' + url);
	};

	return (
		<BgTouchAnimation
			onPress={onPress}
			color={getRawColor(colorScheme[mode].backgroundHighlight)}
			animationType='highlight'
		>
			<View
				style={[styles.container, border && theme.borders.xthin.bottom]}
				padding='m'
			>
				<Icon name='link' size='regular' />
				<View marginLeft='m' style={styles.textContainer}>
					<Text variant='paragraph' marginBottom='xs'>
						{text}
					</Text>
					<Text
						variant='paragraph-small'
						ellipsizeMode='tail'
						numberOfLines={1}
					>
						{url}
					</Text>
				</View>
			</View>
		</BgTouchAnimation>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%'
	},
	textContainer: {
		flex: 1
	}
});

export default BottomSheetListItemLink;
