import { Icon, Text, View } from '@atomic';
import { SheetApi, useTheme } from '@hooks';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
	configMenuSheetApi: SheetApi;
}

const Header: React.FC<HeaderProps> = ({ configMenuSheetApi }) => {
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();

	return (
		<View
			borderBottomColor='border.light'
			borderBottomWidth={theme.borderWidth.thin}
		>
			<View
				margin='m'
				paddingTop='l'
				paddingHorizontal='m'
				style={{ marginTop: insets.top }}
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
			>
				<Text color='text.s'>Scratch</Text>
				<TouchableWithoutFeedback onPress={configMenuSheetApi.open}>
					<Icon name='meatballs' color='icon.p' />
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
};

export default Header;
