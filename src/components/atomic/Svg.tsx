import { CustomSvgProps } from '@types';
import React from 'react';
import { Svg as RNSvg } from 'react-native-svg';

const Svg: React.FC<CustomSvgProps> = (props) => {
	return (
		<RNSvg {...props} width={props.size} height={props.size}>
			{props.children}
		</RNSvg>
	);
};

export default Svg;
