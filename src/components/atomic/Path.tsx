import React from 'react';
import { PathProps, Path as RNSvgPath } from 'react-native-svg';

const Path: React.FC<PathProps> = (props) => {
	return <RNSvgPath {...props} fill={props.fill} stroke={props.stroke} />;
};

export default Path;
