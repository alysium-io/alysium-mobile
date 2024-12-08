import { Svg } from '@atomic';
import { IconProps } from '@types';
import * as React from 'react';
import { Path } from 'react-native-svg';

const OldPhone: React.FC<IconProps> = (props) => (
	<Svg fill='none' viewBox='0 0 18 18' {...props}>
		<Path
			fill={props.color}
			d='M15.797 10.8a2.29 2.29 0 0 0-1.87-.659 2.283 2.283 0 0 0-1.692 1.047l-.197.303c-.316.5-.962.697-1.534.473C8.456 11.161 7.04 9.72 6.19 7.548c-.204-.52.006-1.126.507-1.448l.276-.178a2.293 2.293 0 0 0 .382-3.561L5.836.84A2.3 2.3 0 0 0 2.871.59l-1.297.927C.337 2.4-.156 3.993.377 5.395c2.272 5.977 6.44 10.144 12.398 12.395.376.138.764.21 1.146.21a3.347 3.347 0 0 0 2.72-1.408l.928-1.303a2.29 2.29 0 0 0-.244-2.962l-1.527-1.528Z'
		/>
	</Svg>
);
export default OldPhone;
