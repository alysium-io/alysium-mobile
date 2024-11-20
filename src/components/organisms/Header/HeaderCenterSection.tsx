import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type HeaderCenterSectionProps = Props<typeof View>;

const HeaderCenterSection: React.FC<HeaderCenterSectionProps> = (props) => (
	<View flex={2} justifyContent='center' alignItems='center' {...props} />
);

export default HeaderCenterSection;
