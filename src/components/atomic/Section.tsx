import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type SectionProps = Props<typeof View> & {
	children?: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ children, ...props }) => {
	return (
		<View marginBottom='xxl' {...props}>
			{children}
		</View>
	);
};

export default Section;
