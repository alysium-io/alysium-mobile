import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';

const Block: React.FC<IconProps> = (props) => (
	<Svg viewBox='0 0 18 18' size={props.size} fill='none'>
		<Path
			fill={props.color}
			d='M9 17.674C4.22 17.674.329 13.782.329 9 .328 4.219 4.22.328 9.001.328c4.781 0 8.673 3.891 8.673 8.673 0 4.781-3.892 8.673-8.673 8.673Zm3.277-9.251H5.724a.577.577 0 1 0 0 1.156h6.553a.577.577 0 1 0 0-1.156Z'
		/>
	</Svg>
);

export default Block;
