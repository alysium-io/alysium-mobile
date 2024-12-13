import { Text, View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type FixedEndTextProps = Props<typeof Text> & {
	text?: string;
};

const FixedEndText: React.FC<FixedEndTextProps> = ({ text, ...props }) => {
	return (
		<View marginHorizontal='m' width={75}>
			<Text
				variant='paragraph-small'
				color='text.q'
				textAlign='center'
				textDecorationLine='underline'
				{...props}
			>
				{text ? text : ''}
			</Text>
		</View>
	);
};

export default FixedEndText;
