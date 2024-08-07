import { View } from '@atomic';
import React from 'react';

type SectionProps = React.ComponentProps<typeof View> & {
	children?: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ children, ...props }) => {
	return (
		<View marginBottom='xl' {...props}>
			{children}
		</View>
	);
};

export default Section;
