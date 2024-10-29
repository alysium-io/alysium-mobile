import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const paths: PathProps[] = [
	{
		d: 'M7.96.848c2.532 1.355 4.3 3.49 7.04 4.946-1.815 1.993-2.896 4.509-4.785 6.438C7.837 10.445 5.268 9.37 3 7.57 3.994 5.023 6.384 3.414 7.96.848Z',
		stroke: 'currentColor',
		strokeWidth: 0.5,
		strokeLinecap: 'round',
		strokeLinejoin: 'round'
	},
	{
		d: 'm12.879 9.152.202 4.842c.023.86.21 1.034.634 1.167.662.208 2.248 1.243.465 1.368-.249.018-.662 0-.662 0-.629-.083-1.614.043-1.55-.907l-.046-4.978',
		stroke: 'currentColor',
		strokeWidth: 0.5,
		strokeLinecap: 'round',
		strokeLinejoin: 'round'
	},
	{
		d: 'm6.561 10.44-.058 2.988c0 .61-.137 2.038 1.137 2.308.617.13 1.727 1.327-.122 1.418-.482-.03-.96-.118-1.421-.264-.71-.17-.618-.753-.636-1.279.15-1.944.158-3.897.02-5.841',
		stroke: 'currentColor',
		strokeWidth: 0.5,
		strokeLinecap: 'round',
		strokeLinejoin: 'round'
	},
	{
		d: 'M7.422 5.77c-.812.096-1.644.368-2.578 1.557.908.972 4.279.81 3.603-.886-1.317 1.51-2.996.513-1.025-.671Z',
		stroke: 'currentColor',
		strokeWidth: 0.5,
		strokeLinecap: 'round',
		strokeLinejoin: 'round'
	},
	{
		d: 'M11.222 4.543c-1.216.223-1.386 1.162-2.066 1.752 2.841.448 3.898-.824 3.154-1.287-1.162 1.425-2.525.479-1.088-.465Z',
		stroke: 'currentColor',
		strokeWidth: 0.5,
		strokeLinecap: 'round',
		strokeLinejoin: 'round'
	}
];

const Dice: React.FC<IconProps> = (props) => (
	<Svg {...svg} size={props.size} color={props.color}>
		{paths.map((path, index) => (
			<Path key={index} {...path} />
		))}
	</Svg>
);

export default Dice;
