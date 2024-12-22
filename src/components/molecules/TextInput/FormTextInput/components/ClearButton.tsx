import { Icon, View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

type ClearButtonProps = Props<typeof TouchableOpacity>;

const ClearButton: React.FC<ClearButtonProps> = (props) => {
	return (
		<TouchableOpacity {...props}>
			<View
				marginLeft='m'
				paddingHorizontal='s'
				justifyContent='center'
				alignItems='center'
			>
				<Icon name='clear' size='m' color='search.search-bar.clear-btn-icon' />
			</View>
		</TouchableOpacity>
	);
};

export default ClearButton;
