import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import { useWindowDimensions } from 'react-native';

type SequenceItemProps = Props<typeof View>;

const SequenceItem: React.FC<SequenceItemProps> = (props) => {
	const { width } = useWindowDimensions();
	return <View width={width} {...props} />;
};

export default SequenceItem;
