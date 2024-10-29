import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const paths: PathProps[] = [
	{ d: 'M10.644 6.336H7.36v.994h3.285V6.336Z' },
	{ d: 'M18 12.8h-3.281v.995H18V12.8Z' },
	{ d: 'M18 8.922h-3.281v.994h.02l.01.004H18V8.922Z' },
	{ d: 'M18 11.512h-3.281v.99H18v-.99Z' },
	{ d: 'M18 10.219h-3.281v.997h.02l.01-.007H18v-.99Z' },
	{ d: 'M6.977 10.219H3.688v.997h.012l.007-.007h3.27v-.99Z' },
	{ d: 'M6.973 11.512H3.688v1.005l.001-.008-.001-.008h3.285v-.99Z' },
	{ d: 'M14.339 11.512h-3.3v1.005l.013-.008.002-.008h3.285v-.99Z' },
	{ d: 'M18 7.633h-3.281v.996l.02-.002.01.003H18V7.633Z' },
	{ d: 'M3.68 13.795h.003h.003h3.277v-.994H3.68v.994Z' },
	{ d: 'M14.37 7.633h-3.323v.99h.033l.005.007h3.285V7.633Z' },
	{ d: 'M14.37 8.922h-3.323v.994h.033l.005.004h3.285V8.922Z' },
	{ d: 'M3.281 12.8H0v.995h3.281V12.8Z' },
	{ d: 'M0 11.216h.012l.01-.007h3.27v-.99H0v.997Z' },
	{ d: 'M0 12.51l.001-.008h3.285v-.99H0v.997Z' },
	{ d: 'M10.653 11.512H7.36v.997l.001-.007h3.292v-.99Z' },
	{ d: 'M0 9.916h.023l.01.004h3.267V8.922H0v.994Z' },
	{ d: 'M18 6.336h-3.281v.994H18V6.336Z' },
	{ d: 'M10.66 10.219H7.36v.997h.012l.003-.007h3.285v-.99Z' },
	{ d: 'M7.387 9.92h3.272V8.922H7.36v.994h.025l.003.004Z' },
	{ d: 'M10.644 5.043H7.36v.995h3.285V5.043Z' },
	{ d: 'M18 5.043h-3.281v.995H18V5.043Z' },
	{ d: 'M14.339 10.219h-3.3v.997h.013l.002-.007h3.285v-.99Z' },
	{ d: 'M0 8.63h.023H.034H3.3v-.99H0v.99Z' },
	{ d: 'M10.644 12.8H7.36v.995h3.285V12.8Z' },
	{ d: 'M10.678 7.64H7.36v.99h.024h.01h3.285V7.64Z' },
	{ d: 'M18 3.75h-3.281v.995H18V3.75Z' },
	{ d: 'M11.031 13.795h.002h3.281V12.8h-3.283v.995Z' }
];

const Deezer: React.FC<IconProps> = (props) => (
	<Svg {...svg} size={props.size} color={props.color}>
		{paths.map((path, index) => (
			<Path key={index} {...path} fill={props.color} />
		))}
	</Svg>
);

export default Deezer;
