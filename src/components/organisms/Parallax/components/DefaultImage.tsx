import { Icon, View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type DefaultImageProps = {
	iconProps?: Partial<Props<typeof Icon>>;
};

const DefaultImage: React.FC<DefaultImageProps> = ({ iconProps }) => {
	return (
		<View
			justifyContent='center'
			alignItems='center'
			backgroundColor='bg.p'
			height='100%'
			width='100%'
		>
			<Icon name='artist' size='xl' color='text.p' {...iconProps} />
		</View>
	);
};

export default DefaultImage;
