import { Text, View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type LabelProps = Props<typeof View>;

const Label: React.FC<LabelProps> = ({ children, ...props }) => {
	return (
		<View width={75} {...props}>
			<Text variant='paragraph-medium' color='text.s' marginRight='m'>
				{children}
			</Text>
		</View>
	);
};

export default Label;
