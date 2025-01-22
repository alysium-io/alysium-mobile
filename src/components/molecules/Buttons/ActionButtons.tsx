import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import Button from './Button';

type ButtonProps = Props<typeof Button>;

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

	let buttons = !Array.isArray(buttonProps) ? [buttonProps] : buttonProps;
	if (buttons && buttons.length > 0) {
		return (
			<View
				flexDirection={buttons.length === 1 ? 'column' : 'row'}
				columnGap='m'
			>
				{buttons.map((i, index) => (
					<View
						key={`action-button-${index}`}
						flex={buttons.length > 1 ? 1 : undefined}
					>
						<Button {...i} />
					</View>
				))}
			</View>
		);
	}
};

export default ActionButtons;
