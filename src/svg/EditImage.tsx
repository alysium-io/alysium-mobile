import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	fill: 'none',
	viewBox: '0 0 18 18'
};

const path1: PathProps = {
	fillRule: 'evenodd',
	d: 'm16.274 10.688.498-.499a.688.688 0 0 0 0-.996l-.498-.498a.688.688 0 0 0-.997 0l-.498.498 1.495 1.495ZM14.21 9.62l-5.482 5.552v1.566h1.495l5.552-5.552L14.21 9.62Z',
	clipRule: 'evenodd'
};

const path2: PathProps = {
	d: 'M5.525 4.637c.57 0 1.068.498 1.068 1.068 0 .498-.427 1.068-1.068 1.068-.57 0-1.067-.499-1.067-1.068 0-.57.498-1.068 1.067-1.068Zm0-.712c-.996 0-1.78.783-1.78 1.78 0 .996.784 1.78 1.78 1.78.997 0 1.78-.855 1.78-1.78 0-.997-.783-1.78-1.78-1.78Z'
};

const path3: PathProps = {
	d: 'M7.305 14.674h-5.41a.973.973 0 0 1-.997-.997V2.075c0-.499.499-.997.997-.997h11.531c.499 0 .997.498.997.997V6.06c0 .427-.285.712-.712.712S13 6.488 13 6.06V2.5H2.322v10.75h4.983c.427 0 .712.284.712.711s-.285.712-.712.712Z'
};

const path4: PathProps = {
	d: 'M4.742 12.111c-.07 0-.213 0-.284-.07a.344.344 0 0 1 0-.5l2.847-2.918c.071-.07.138-.085.285-.085a.44.44 0 0 1 .284.085L9.44 10.19a.344.344 0 0 1 0 .499.344.344 0 0 1-.498 0L7.59 9.335 5.027 11.97c-.071.142-.214.142-.285.142Z'
};

const path5: PathProps = {
	d: 'M8.515 10.118c-.071 0-.073-.072-.144-.143-.142-.142-.283-.284-.14-.426l1.921-1.922a.344.344 0 0 1 .498 0l1.424 1.423a.344.344 0 0 1 0 .499.344.344 0 0 1-.498 0l-1.14-1.14-1.708 1.567c0 .071-.142.142-.213.142Z'
};

const EditImage: React.FC<IconProps> = (props) => {
	if (props.animated) {
		return (
			<Svg
				{...svg}
				size={props.size}
				animated
				animatedProps={props.animatedSvgProps}
			>
				<Path
					{...path1}
					fill={props.color}
					animated
					animatedProps={props.animatedPathProps}
				/>
				<Path
					{...path2}
					fill={props.color}
					animated
					animatedProps={props.animatedPathProps}
				/>
				<Path
					{...path3}
					fill={props.color}
					animated
					animatedProps={props.animatedPathProps}
				/>
				<Path
					{...path4}
					fill={props.color}
					animated
					animatedProps={props.animatedPathProps}
				/>
				<Path
					{...path5}
					fill={props.color}
					animated
					animatedProps={props.animatedPathProps}
				/>
			</Svg>
		);
	}

	return (
		<Svg {...svg} size={props.size}>
			<Path {...path1} fill={props.color} />
			<Path {...path2} fill={props.color} />
			<Path {...path3} fill={props.color} />
			<Path {...path4} fill={props.color} />
			<Path {...path5} fill={props.color} />
		</Svg>
	);
};

export default EditImage;
