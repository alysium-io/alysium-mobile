import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 501 501',
	fill: 'none'
};

const path: PathProps = {
	d: 'M250.093.004c-.003-.002-.006-.004-.009-.004a250.078 250.078 0 0 0-149.168 49.383 250.15 250.15 0 0 0-90.288 128.603 250.204 250.204 0 0 0 4.23 157.087 250.155 250.155 0 0 0 97.083 123.56 250.122 250.122 0 0 0 151.615 41.28 250.159 250.159 0 0 0 146.326-57.289 250.123 250.123 0 0 0 83.275-133.254 250.14 250.14 0 0 0-12.622-156.626A250.148 250.148 0 0 0 250.102.008a.01.01 0 0 1-.009-.004Zm-.005 437.726c.001.002-.001.004-.003.004-59.882.021-116.178-28.561-151.514-76.913a187.6 187.6 0 0 1-27.256-167.724A187.602 187.602 0 0 1 325.254 78.261c18.474 8.086 20.485 31.971 6.225 46.231-10.54 10.54-26.776 12.142-40.849 7.228a126.388 126.388 0 0 0-94.068 4.316 126.385 126.385 0 0 0-71.963 92.463 126.391 126.391 0 0 0 146.7 146.961 126.4 126.4 0 0 0 92.594-71.799 126.303 126.303 0 0 0 11.42-56.172c-1.062-37.651 1.04-79.465 27.675-106.1-.004.004-.004.009-.001.012a188.111 188.111 0 0 1 19.929 35.713c24.476 57.933 18.293 124.279-16.467 176.699-34.758 52.409-93.469 83.918-156.357 83.914-.002 0-.004.001-.004.003Zm62.536-187.596a62.518 62.518 0 0 1-27.726 51.957 62.528 62.528 0 0 1-96.093-39.53 62.536 62.536 0 0 1 16.864-56.434 62.565 62.565 0 0 1 56.269-17.388 62.544 62.544 0 0 1 45.763 37.082 62.672 62.672 0 0 1 4.923 24.313Z'
};

const Logo: React.FC<IconProps> = (props) => {
	if (props.animated) {
		return (
			<Svg
				{...svg}
				size={props.size}
				animated={true}
				animatedProps={props.animatedSvgProps}
			>
				<Path
					{...path}
					fill={props.color}
					animated={true}
					animatedProps={props.animatedPathProps}
				/>
			</Svg>
		);
	}

	return (
		<Svg {...svg} size={props.size}>
			<Path {...path} fill={props.color} />
		</Svg>
	);
};

export default Logo;
