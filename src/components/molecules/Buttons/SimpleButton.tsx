import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import ButtonTextContent from './components/ButtonTextContent';

type SimpleButtonProps = Props<typeof TouchableOpacity> &
	Omit<Props<typeof ButtonTextContent>, 'textColor'> & {};

const SimpleButton: React.FC<SimpleButtonProps> = ({
	beforeIconProps,
	afterIconProps,
	text,
	...props
}) => {
	return (
		<TouchableOpacity activeOpacity={0.7} {...props}>
			<View backgroundColor='bg.light' borderRadius='m' paddingVertical='m'>
				<ButtonTextContent
					text={text}
					textColor='text.p'
					beforeIconProps={beforeIconProps}
					afterIconProps={afterIconProps}
				/>
			</View>
		</TouchableOpacity>
	);
};

export default SimpleButton;
