import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';

const Flag: React.FC<IconProps> = (props) => (
	<Svg viewBox='0 0 18 18' size={props.size} fill='none'>
		<Path
			fill={props.color}
			d='M1.54.97v15.976a.614.614 0 1 0 1.228 0V.97a.614.614 0 1 0-1.229 0ZM16.29.67a.616.616 0 0 0-.537-.315H4.614A.614.614 0 0 0 4 .97v7.988c0 .34.275.614.614.614h11.14a.614.614 0 0 0 .522-.936l-2.259-3.672 2.26-3.672A.616.616 0 0 0 16.29.67Z'
		/>
	</Svg>
);

export default Flag;
