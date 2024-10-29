import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M15.832 2.022c-.1-.067-.201-.067-.302-.033-.839.371-1.712.1-2.216-.574a1.913 1.913 0 0 1-.369-1.081c0-.101-.034-.169-.101-.236-.067-.068-.134-.102-.235-.102H9.185c-.202 0-.336.135-.336.338v11.988c0 .034 0 .034 0 .068-.067.608-.537 1.047-1.142 1.047-.637 0-1.175-.54-1.175-1.182 0-.608.437-1.08 1.041-1.148.168-.034.302-.169.302-.338V6.852c0-.203-.134-.338-.336-.338h-.067c-3.089.135-5.473 2.634-5.473 5.741C2 15.43 4.552 17.996 7.707 17.996c2.955 0 5.473-2.431 5.708-5.37 0 .034 0-.066 0 0V6.11c.739.169 1.511.236 2.317.101.168-.034.269-.169.269-.338V2.293c0-.101-.067-.202-.168-.27Z'
};

const TikTok: React.FC<IconProps> = (props) => (
	<Svg {...svg} size={props.size} color={props.color}>
		<Path {...path} fill={props.color} />
	</Svg>
);

export default TikTok;
