import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M17.983 4.812c-.08 1.755-1.305 4.16-3.672 7.207-2.45 3.188-4.517 4.779-6.217 4.779-1.057 0-1.933-.97-2.666-2.91L3.99 8.55c-.539-1.937-1.113-2.906-1.731-2.906-.135 0-.607.281-1.412.846L0 5.397c.888-.782 1.764-1.561 2.625-2.344 1.184-1.028 2.075-1.564 2.667-1.62 1.4-.135 2.261.827 2.587 2.878.349 2.214.589 3.591.727 4.13.404 1.837.849 2.757 1.332 2.757.375 0 .94-.598 1.7-1.79.752-1.193 1.154-2.098 1.206-2.722.109-1.025-.297-1.544-1.21-1.544-.43 0-.876.092-1.334.293.891-2.9 2.576-4.318 5.072-4.228 1.854.045 2.722 1.249 2.619 3.598l-.008.007Z'
};

const Vimeo: React.FC<IconProps> = (props) => (
	<Svg {...svg} size={props.size} color={props.color}>
		<Path {...path} fill={props.color} />
	</Svg>
);

export default Vimeo;
