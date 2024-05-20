import { View } from '@atomic';
import { Button, ButtonState } from '@molecules';
import { OnSubmitHandler } from '@types';
import React from 'react';

interface ActionButtonsProps {
	cancel: () => void;
	onSubmit: OnSubmitHandler;
	createEventButtonState: ButtonState;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
	cancel,
	onSubmit,
	createEventButtonState
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
					buttonState={createEventButtonState}
					disabled={createEventButtonState === 'disabled'}
				/>
			</View>
		</View>
	);
};

export default ActionButtons;
