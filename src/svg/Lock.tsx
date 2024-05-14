import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M9 .375a5.23 5.23 0 0 0-5.19 4.506l-.022.142a5.36 5.36 0 0 0-.038.609v.751c-.829 0-1.5.676-1.5 1.502v8.26c0 .827.672 1.503 1.5 1.503h10.5c.829 0 1.5-.676 1.5-1.502V7.885c0-.826-.672-1.502-1.5-1.502v-.751c0-.207-.015-.409-.038-.609l-.022-.142c.004 0-.006 0 0 0A5.23 5.23 0 0 0 9 .375Zm0 2.253a3.013 3.013 0 0 1 3 3.004v.751H6v-.75c0-.208.03-.415.07-.611.057-.278.16-.536.287-.78.039-.072.074-.147.118-.216.045-.073.098-.14.149-.207.061-.08.124-.16.194-.233.048-.052.1-.101.152-.15.086-.08.176-.155.271-.224.052-.038.103-.076.157-.11.104-.067.215-.124.328-.178.054-.025.106-.054.161-.076.122-.05.25-.085.38-.117.053-.014.105-.034.16-.044.186-.036.377-.059.573-.059Z'
};

const Lock: React.FC<IconProps> = (props) => {
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

export default Lock;
