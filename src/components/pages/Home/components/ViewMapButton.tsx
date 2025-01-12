import { Icon, Text, View } from '@atomic';
import { useNavigation, useTheme } from '@hooks';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const ViewMapButton = () => {
	const { localEventsMapPage } = useNavigation();
	const { theme } = useTheme();
	return (
		<View
			position='absolute'
			bottom={theme.spacing.m}
			flexDirection='row'
			justifyContent='center'
			width='100%'
			alignItems='center'
			pointerEvents='box-none'
		>
			<TouchableOpacity activeOpacity={0.8} onPress={localEventsMapPage}>
				<View
					paddingVertical='m'
					paddingHorizontal='l'
					backgroundColor='button.solid.active.bg.p'
					borderRadius='round'
					flexDirection='row'
					justifyContent='center'
					alignItems='center'
				>
					<Text
						variant='paragraph-large'
						marginRight='s'
						color='button.solid.active.text.p'
					>
						View Map
					</Text>
					<Icon name='location' size={20} color='button.solid.active.text.p' />
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default ViewMapButton;
