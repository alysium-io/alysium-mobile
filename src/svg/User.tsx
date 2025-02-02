import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';

const User: React.FC<IconProps> = (props) => (
	<Svg size={props.size} viewBox='0 0 18 18' fill='none'>
		<Path
			fill={props.color}
			fillRule='evenodd'
			d='M1.96 15.071c.029 1.416.662 2.602 2.218 2.602h9.81c2.651 0 2.409-3.197 1.847-5.048-.554-1.822-2.269-2.951-4.142-2.951H6.474c-1.873 0-3.589 1.13-4.141 2.951a8.272 8.272 0 0 0-.37 2.447l-.002-.001ZM9.084.164c2.265 0 4.1 1.834 4.1 4.097 0 3.64-4.424 5.47-7 2.897C3.609 4.585 5.442.164 9.084.164Z'
			clipRule='evenodd'
		/>
	</Svg>
);
export default User;
