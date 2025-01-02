import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';

const Alcohol: React.FC<IconProps> = (props) => {
	return (
		<Svg viewBox='0 0 18 18' fill='none' size={props.size}>
			<Path
				d='m15.123 4.085-5.556 4.93v6.39l3.092 1.513H5.413l3.092-1.512v-6.39l-5.622-4.93h8.576l1.716-3.008.462.27-1.563 2.737h3.049Zm-1.298.505-2.044.008-.63 1.104h1.453l1.221-1.112ZM9.567 7.857a.569.569 0 0 0 .566-.572.57.57 0 0 0-.566-.573.57.57 0 0 0-.566.573.57.57 0 0 0 .566.572ZM4.181 4.59l1.231 1.112h5.124l.629-1.1L4.18 4.59Z'
				fill={props.color}
			/>
		</Svg>
	);
};

export default Alcohol;
