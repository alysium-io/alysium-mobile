import { Text } from '@atomic';
import { IChildrenProps } from '@types';
import React from 'react';

interface SectionBodyProps extends IChildrenProps {}

const SectionBody: React.FC<SectionBodyProps> = (props) => {
	return <Text variant='paragraph-small-light' {...props} />;
};

export default SectionBody;
