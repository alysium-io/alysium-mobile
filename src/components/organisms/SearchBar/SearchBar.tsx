import { Icon, Text, TextInput, View } from '@atomic';
import { Colors } from '@etc';
import { useTextInput, useTheme } from '@hooks';
import { ThemeMode } from '@types';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { FadeIn, LinearTransition } from 'react-native-reanimated';

interface SearchBarProps {
	onChangeText: (text: string) => void;
	onPressClearText: () => void;
	barDidActivate?: () => void;
	barDidDeactivate?: () => void;
	isActive: boolean;
	setIsActive: (isActive: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
	onChangeText,
	onPressClearText,
	barDidActivate,
	barDidDeactivate,
	isActive,
	setIsActive
}) => {
	const { ref, focus, clear, blur } = useTextInput();
	const { theme, getRawColor, mode } = useTheme();
	const [showClearButton, setShowClearButton] = useState<boolean>(false);

	const colorScheme = {
		[ThemeMode.dark]: {
			placeholderText: Colors.RGBA2String(
				Colors.hex2RGBA(getRawColor(theme.colors.ion_light), 0.8)
			),
			text: theme.colors.ion_light,
			background: 'ion_dark',
			icon: 'ion_light',
			clearBtn: 'ion'
		},
		[ThemeMode.light]: {
			placeholderText: Colors.RGBA2String(
				Colors.hex2RGBA(getRawColor(theme.colors.ion_dark), 0.7)
			),
			text: theme.colors.ion_dark,
			background: 'ion_light',
			icon: 'ion_dark',
			clearBtn: 'ion'
		}
	};

	const _onPressActivate = () => {
		setIsActive(true);
		focus();
		barDidActivate && barDidActivate();
	};

	const _onPressDeactivate = () => {
		Keyboard.dismiss();
		setIsActive(false);
		blur();
		barDidDeactivate && barDidDeactivate();
	};

	const _onPressClear = () => {
		onPressClearText();
		clear();
		setShowClearButton(false);
	};

	const _onChangeText = (text: string) => {
		onChangeText(text);
		setShowClearButton(text.length > 0);
	};

	return (
		<View style={styles.container}>
			<View
				animated
				layout={LinearTransition.duration(200)}
				style={styles.textContainer}
				backgroundColor={colorScheme[mode].background}
			>
				<TouchableWithoutFeedback onPress={_onPressActivate}>
					<View padding='s' style={styles.textContainerLeft}>
						<Icon name='search' size='regular' color={colorScheme[mode].icon} />
						<View flex={1} paddingLeft='s' justifyContent='center'>
							<TextInput
								ref={ref}
								variant='paragraph-bold'
								placeholderTextColor={colorScheme[mode].placeholderText}
								placeholder='Search Alysium...'
								onChangeText={_onChangeText}
								onFocus={_onPressActivate}
								style={{ color: colorScheme[mode].text }}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
				{showClearButton && isActive && (
					<TouchableWithoutFeedback onPress={_onPressClear}>
						<View
							animated
							entering={FadeIn.delay(100).duration(100)}
							padding='s'
							style={styles.textContainerRight}
						>
							<Icon
								name='clear'
								size='regular'
								color={colorScheme[mode].clearBtn}
							/>
						</View>
					</TouchableWithoutFeedback>
				)}
			</View>
			{isActive && (
				<TouchableWithoutFeedback onPress={_onPressDeactivate}>
					<View
						animated
						entering={FadeIn.delay(200).duration(200)}
						exiting={FadeIn.delay(200).duration(200)}
						padding='s'
					>
						<Text variant='paragraph-medium' color='t1'>
							cancel
						</Text>
					</View>
				</TouchableWithoutFeedback>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	textContainer: {
		flex: 1,
		flexDirection: 'row',
		borderRadius: 10
	},
	textContainerLeft: {
		flexDirection: 'row',
		flex: 1
	},
	textContainerRight: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default SearchBar;
