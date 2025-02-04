import { Icon, View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import { TouchableOpacity } from 'react-native';

type AddItemProps = Props<typeof TouchableOpacity>;

const AddItem: React.FC<AddItemProps> = (props) => {
	return (
		<TouchableOpacity style={{ flex: 1 }} {...props}>
			<View flex={1} justifyContent='center' alignItems='center'>
				<Icon name='edit-image' size='l' color='palette.neutral.p1' />
			</View>
		</TouchableOpacity>
	);
};

export default AddItem;
