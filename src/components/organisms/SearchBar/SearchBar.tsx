import { Icon, Text, TextInput, View } from '@atomic';
import { useTextInput, useTheme } from '@hooks';
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
	const { theme } = useTheme();
	const { ref, focus, clear, blur } = useTextInput();
	const [showClearButton, setShowClearButton] = useState<boolean>(false);

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
				backgroundColor='search.search-bar.bg'
			>
				<TouchableWithoutFeedback onPress={_onPressActivate}>
					<View style={styles.textContainerLeft}>
						<Icon name='search' size='m' color='search.search-bar.icon' />
						<View flex={1} paddingLeft='s' justifyContent='center'>
							<TextInput
								ref={ref}
								variant='paragraph-bold'
								placeholderTextColor={
									theme.colors['search.search-bar.placeholder-text']
								}
								placeholder='Search Alysium...'
								onChangeText={_onChangeText}
								onFocus={_onPressActivate}
								color='search.search-bar.text'
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
								size='m'
								color='search.search-bar.clear-btn-icon'
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
						<Text variant='paragraph-medium' color='text.p'>
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
		justifyContent: 'center',
		alignItems: 'center',
		padding: 12,
		flex: 1
	},
	textContainerRight: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default SearchBar;
