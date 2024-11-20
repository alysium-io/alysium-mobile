import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type PillGroupProps = Props<typeof View>;

const PillGroup: React.FC<PillGroupProps> = (props) => {
	return <View flexDirection='row' flexWrap='wrap' {...props} />;
};

export default PillGroup;
