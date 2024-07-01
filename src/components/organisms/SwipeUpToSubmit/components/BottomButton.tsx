import { View } from '@atomic';
import { Button } from '@molecules';
import React from 'react';

interface BottomButtonProps {
	onPress: () => void;
	buttonText?: string;
}

const BottomButton: React.FC<BottomButtonProps> = ({
	onPress,
	buttonText = 'cancel'
}) => {
	return (
		<View marginHorizontal='m' marginTop='m'>
			<Button
				text={buttonText}
				onPress={onPress}
				variant='outlined'
				colorVariant='default'
				buttonColorConfig={{
					background: 'transparent',
					borderColor: 'white',
					text: 'white'
				}}
			/>
		</View>
	);
};

export default BottomButton;
