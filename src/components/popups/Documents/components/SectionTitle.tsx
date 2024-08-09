import { Text } from '@atomic';
import { IChildrenProps } from '@types';
import React from 'react';

interface SectionTitleProps extends IChildrenProps {}

const SectionTitle: React.FC<SectionTitleProps> = (props) => {
	return <Text variant='paragraph-medium' marginBottom='s' {...props} />;
};

export default SectionTitle;
