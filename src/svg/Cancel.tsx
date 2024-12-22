import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';

const Cancel: React.FC<IconProps> = (props) => (
	<Svg size={props.size} viewBox='0 0 18 18' fill='none'>
		<Path
			fill={props.color}
			d='M9 0C4.05 0 0 4.069 0 9.042s4.05 9.042 9 9.042 9-4.07 9-9.042C18 4.069 13.95 0 9 0Zm0 2.26c1.485 0 2.835.475 3.938 1.266L3.51 12.998a6.786 6.786 0 0 1-1.26-3.956C2.25 5.289 5.265 2.26 9 2.26Zm5.49 2.826a6.786 6.786 0 0 1 1.26 3.956c0 3.752-3.015 6.781-6.75 6.781a6.712 6.712 0 0 1-3.938-1.266l9.428-9.47Z'
		/>
	</Svg>
);

export default Cancel;
