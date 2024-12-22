import { CustomPathProps } from '@types';
import React from 'react';
import { Path as RNSvgPath } from 'react-native-svg';

const Path: React.FC<CustomPathProps> = (props) => {
	return <RNSvgPath {...props} fill={props.fill} stroke={props.stroke} />;
};

export default Path;
