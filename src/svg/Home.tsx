import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';

const Home: React.FC<IconProps> = (props) => (
	<Svg size={props.size} viewBox='0 0 18 18' fill='none'>
		<Path
			fill={props.color}
			d='M17.733 5.007 9.247.39a.515.515 0 0 0-.494 0L.267 5.007A.512.512 0 0 0 0 5.458v11.54c0 .282.231.512.514.512h5.4c.284 0 .515-.23.515-.513V13.92a2.571 2.571 0 0 1 5.142 0v3.077c0 .283.232.513.515.513h5.4c.283 0 .514-.23.514-.513V5.458a.516.516 0 0 0-.267-.451Z'
		/>
	</Svg>
);
export default Home;
