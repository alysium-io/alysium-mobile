import { Icon, Text, TextInput, View } from '@atomic';
import { SearchApi, useTheme } from '@hooks';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { FadeIn, LinearTransition } from 'react-native-reanimated';

type SearchBarProps = React.ComponentProps<typeof TextInput> & {
	searchApi: SearchApi;
};

const SearchBar: React.FC<SearchBarProps> = ({
	searchApi,
	placeholder = 'Search Alysium...',
	...props
}) => {
	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			<View
				animated
				layout={LinearTransition.duration(200)}
				style={styles.textContainer}
				backgroundColor='search.search-bar.bg'
			>
				<TouchableWithoutFeedback onPress={searchApi.pressActivate}>
					<View style={styles.textContainerLeft}>
						<Icon name='search' size='m' color='search.search-bar.icon' />
						<View flex={1} paddingLeft='s' justifyContent='center'>
							<TextInput
								ref={searchApi.textInputApi.ref}
								variant='paragraph-bold'
								placeholderTextColor={
									theme.colors['search.search-bar.placeholder-text']
								}
								placeholder={placeholder}
								onChangeText={searchApi.onChangeText}
								onFocus={searchApi.pressActivate}
								color='search.search-bar.text'
								{...props}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
				{searchApi.clearButtonToggleApi.state &&
					searchApi.activeToggleApi.state && (
						<TouchableWithoutFeedback onPress={searchApi.pressClear}>
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
			{searchApi.activeToggleApi.state && (
				<TouchableWithoutFeedback onPress={searchApi.pressDeactivate}>
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
