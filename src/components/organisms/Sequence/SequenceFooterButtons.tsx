import { View } from '@atomic';
import { Button } from '@molecules';
import React from 'react';

interface SequenceFooterButtonsProps {
	buttons: React.ComponentProps<typeof Button>[];
}

const SequenceFooterButtons: React.FC<SequenceFooterButtonsProps> = ({
	buttons
}) => {
	const marginSize = 's';
	return (
		<View padding='m' flexDirection='row'>
			{buttons.map((buttonProps, index) => (
				<View
					key={index}
					flex={1}
					marginHorizontal={marginSize}
					marginLeft={index === 0 ? 'none' : marginSize}
					marginRight={index === buttons.length - 1 ? 'none' : marginSize}
				>
					<Button {...buttonProps} />
				</View>
			))}
		</View>
	);
};

export default SequenceFooterButtons;
