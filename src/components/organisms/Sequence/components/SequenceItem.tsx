import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

type SequenceItemProps = Props<typeof View> & {};

const SequenceItem: React.FC<SequenceItemProps> = (props) => {
	return <View width={width} {...props} />;
};

export default SequenceItem;
