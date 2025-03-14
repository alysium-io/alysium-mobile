import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';

const VolumeOn: React.FC<IconProps> = (props) => (
	<Svg viewBox='0 0 18 18' size={props.size} fill='none' {...props}>
		<Path
			fill={props.color}
			d='M11.767.599a.562.562 0 0 0-.592.054L4.872 5.427h-3.52a.995.995 0 0 0-.993.996v5.153c0 .549.445.995.992.995h3.521l6.303 4.774a.562.562 0 0 0 .905-.452V1.106a.567.567 0 0 0-.313-.507Zm-.816 15.157L5.4 11.553a.564.564 0 0 0-.34-.115H1.488V6.56h3.573c.123 0 .242-.04.34-.115l5.55-4.203v13.514Zm3.373-9.624a.565.565 0 0 0-.564.566V11.3a.565.565 0 1 0 1.128 0V6.698a.566.566 0 0 0-.564-.566Zm2.751-2.266a.565.565 0 0 0-.564.567v9.133a.565.565 0 1 0 1.128 0V4.433a.565.565 0 0 0-.564-.567Z'
		/>
	</Svg>
);

export default VolumeOn;
