import { View } from '@atomic';
import { Button, ButtonState } from '@molecules';
import React from 'react';

interface BottomButtonsProps {
	cancel: () => void;
	onSubmit: () => void;
	createVenueButtonState: ButtonState;
}

const BottomButtons: React.FC<BottomButtonsProps> = ({
	cancel,
	onSubmit,
	createVenueButtonState
}) => {
	return (
		<View margin='m' flexDirection='row'>
			<View flex={1} marginRight='s'>
				<Button
					text='Cancel'
					colorVariant='default'
					variant='outlined'
					onPress={cancel}
				/>
			</View>
			<View flex={1} marginLeft='s'>
				<Button
					text='Create'
					onPress={onSubmit}
					colorVariant='default'
					buttonState={createVenueButtonState}
					disabled={createVenueButtonState === 'disabled'}
				/>
			</View>
		</View>
	);
};

export default BottomButtons;
