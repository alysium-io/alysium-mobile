import { BgTouchAnimation, Icon, Text, View } from '@atomic';
import { Colors } from '@etc';
import { useTheme } from '@hooks';
import { IconNames } from '@svg';
import { ColorTypes, ThemeMode } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';

interface MenuListItemProps {
	title: string;
	subtitle?: string;
	onPress?: () => void;
	color?: ColorTypes;
	secondaryText?: string;
	border?: boolean;
	titleProps?: React.ComponentProps<typeof Text>;
	secondaryTextProps?: React.ComponentProps<typeof Text>;
	icon?: IconNames;
}

const MenuListItem: React.FC<MenuListItemProps> = ({
	title,
	subtitle,
	color = 'default',
	onPress,
	secondaryText,
	titleProps,
	border = true,
	icon = 'arrow-right',
	secondaryTextProps
}) => {
	const { getRawColor, mode, theme } = useTheme();

	const colorScheme = {
		[ThemeMode.dark]: {
			backgroundActive: Colors.RGBA2String(
				Colors.hex2RGBA(getRawColor(color + '_light'), 0.1)
			),
			border: getRawColor(color + '_dark'),
			text: color + '_light'
		},
		[ThemeMode.light]: {
			backgroundActive: Colors.RGBA2String(
				Colors.hex2RGBA(getRawColor(color), 0.1)
			),
			border: getRawColor(color + '_light'),
			text: color + '_dark'
		}
	};

	return (
		<BgTouchAnimation
			color={colorScheme[mode].backgroundActive}
			animationType='highlight'
			onPress={onPress}
		>
			<View paddingHorizontal='m'>
				<View
					paddingVertical='l'
					style={[
						styles.container,
						{
							borderBottomWidth: border ? 0.2 : 0,
							borderBottomColor: theme.colors.bg2
						}
					]}
				>
					<View style={styles.textContainer}>
						<Text variant='paragraph-medium' numberOfLines={1} {...titleProps}>
							{title}
						</Text>
						{subtitle && (
							<Text
								variant='paragraph-small'
								numberOfLines={1}
								color={colorScheme[mode].text}
								marginTop='xs'
							>
								{subtitle}
							</Text>
						)}
					</View>
					{secondaryText && (
						<Text
							variant='paragraph-small'
							color={colorScheme[mode].text}
							numberOfLines={1}
							ellipsizeMode='tail'
							marginHorizontal='s'
							style={{ maxWidth: '50%' }}
							{...secondaryTextProps}
						>
							{secondaryText}
						</Text>
					)}
					<Icon name={icon} size='small' color={colorScheme[mode].text} />
				</View>
			</View>
		</BgTouchAnimation>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	textContainer: {
		flex: 1
	}
});

export default MenuListItem;
