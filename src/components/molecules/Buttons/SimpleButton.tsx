import { Text, View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import { TouchableOpacity } from 'react-native';

type SimpleButtonProps = Props<typeof TouchableOpacity> & {};

const SimpleButton: React.FC<SimpleButtonProps> = (props) => {
	return (
		<TouchableOpacity activeOpacity={0.7} {...props}>
			<View backgroundColor='bg.light' borderRadius='m' paddingVertical='m'>
				<Text variant='paragraph-small-medium' textAlign='center'>
					Edit Profile
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default SimpleButton;
