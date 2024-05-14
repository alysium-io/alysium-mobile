import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path1: PathProps = {
	d: 'M1.789 10.383c.05.036.125.039.18.007 1.453-.84 4.03-1.4 6.975-1.4 2.944 0 5.52.56 6.975 1.4.055.032.13.029.18-.007.525-.374.803-.781.796-1.18.012-.677-.796-1.38-2.248-1.903-1.44-.521-3.466-.85-5.703-.85-2.238 0-4.264.329-5.704.85C1.787 7.824.98 8.526.992 9.202c-.007.4.27.807.797 1.181Z'
};

const path2: PathProps = {
	d: 'M14.88 11.07c-1.538.556-3.63.891-5.938.892-2.309-.001-4.399-.336-5.938-.891-.885-.321-1.56-.67-2.027-1.312-.033-.044-.098-.065-.16-.052-.063.013-.106.057-.106.108v1.713c0 1.642 3.686 2.974 8.231 2.974 4.547 0 8.232-1.332 8.232-2.974V9.849c0-.05-.043-.095-.106-.108-.063-.013-.128.01-.16.053-.494.694-1.127.95-2.028 1.277ZM9.037 4.98l1.845-.692a.084.084 0 0 0 .054-.078c0-.034-.02-.068-.054-.078l-1.9-.712a.08.08 0 0 0-.078.01.084.084 0 0 0-.037.071V6.08h.17v-1.1ZM12.2 5.258l1.846-.692a.083.083 0 0 0 .054-.079c0-.033-.02-.067-.054-.078l-1.9-.712a.08.08 0 0 0-.078.01.084.084 0 0 0-.037.072V6.357h.17v-1.1ZM15.373 6.332l1.845-.692a.084.084 0 0 0 .054-.078c0-.034-.02-.068-.054-.078l-1.9-.713a.08.08 0 0 0-.078.01.084.084 0 0 0-.037.072V7.43h.17v-1.1ZM5.865 5.258l1.845-.692a.084.084 0 0 0 .055-.079c0-.033-.02-.067-.055-.078l-1.9-.712a.08.08 0 0 0-.077.01.084.084 0 0 0-.038.072V6.357h.17v-1.1ZM2.7 6.308l1.846-.692a.084.084 0 0 0 .054-.078c0-.034-.02-.068-.054-.078l-1.9-.712a.08.08 0 0 0-.078.01.084.084 0 0 0-.037.071V7.408h.17v-1.1Z'
};

const Arena: React.FC<IconProps> = (props) => {
	if (props.animated) {
		return (
			<Svg
				{...svg}
				size={props.size}
				animated={true}
				animatedProps={props.animatedSvgProps}
			>
				<Path
					{...path1}
					fill={props.color}
					animated={true}
					animatedProps={props.animatedPathProps}
				/>
				<Path
					{...path2}
					fill={props.color}
					animated={true}
					animatedProps={props.animatedPathProps}
				/>
			</Svg>
		);
	}

	return (
		<Svg {...svg} size={props.size}>
			<Path {...path1} fill={props.color} />
			<Path {...path2} fill={props.color} />
		</Svg>
	);
};

export default Arena;
