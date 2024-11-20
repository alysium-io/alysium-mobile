import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type SectionProps = Props<typeof View>;

const Section: React.FC<SectionProps> = ({ ...props }) => {
	return <View marginBottom='xxl' {...props} />;
};

export default Section;
