import { Icon, Text, View } from '@atomic';
import { useNavigation, useTheme } from '@hooks';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const ViewMapButton = () => {
	const { localEventsMapPage } = useNavigation();
	const { theme } = useTheme();
	return (
		<View
			margin='m'
			position='absolute'
			bottom={0}
			left={0}
			right={0}
			flexDirection='row'
			justifyContent='center'
		>
			<TouchableOpacity activeOpacity={0.8} onPress={localEventsMapPage}>
				<View
					margin='m'
					paddingVertical='m'
					paddingHorizontal='l'
					backgroundColor='button.solid.active.bg.p'
					borderRadius='round'
					flexDirection='row'
					justifyContent='center'
					alignItems='center'
				>
					<Text variant='paragraph-large' marginRight='s'>
						View Map
					</Text>
					<Icon name='location' size={20} />
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default ViewMapButton;
