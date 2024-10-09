import { View } from '@atomic';
import React from 'react';
import Button from './Button';

type ButtonProps = React.ComponentProps<typeof Button>;

interface ActionButtonsProps {
	buttonProps: ButtonProps | ButtonProps[];
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ buttonProps }) => {
	/**
	 * The only purpose of this component is to dynamically render
	 * the standard "action buttons" that are so often used in the application.
	 * There are really only 2 scenarios that this covers, but both scenarios have
	 * a bit of boilerplate, and are different enough that it's just kinda worth
	 * having this wrapper display component to handle it.
	 */

	// If we have a single button, we just render it normally
	if (!Array.isArray(buttonProps)) {
		return <Button {...buttonProps} />;
	}

	if (Array.isArray(buttonProps) && buttonProps.length === 1) {
		return <Button {...buttonProps[0]} />;
	}

	if (buttonProps.length > 2) {
		throw new Error('ActionButtons component only supports up to 2 buttons');
	}

	// If we have 2 buttons, we render them side by side
	return (
		<View flexDirection='row'>
			<View marginRight='s' flex={1}>
				<Button {...buttonProps[0]} />
			</View>
			<View marginLeft='s' flex={1}>
				<Button {...buttonProps[1]} />
			</View>
		</View>
	);
};

export default ActionButtons;
