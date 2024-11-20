import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type ContainerProps = Props<typeof View>;

const Container: React.FC<ContainerProps> = ({ ...props }) => {
	return (
		<View
			borderRadius='round'
			flexDirection='row'
			alignItems='center'
			justifyContent='center'
			paddingHorizontal='m'
			paddingVertical='s'
			marginRight='s'
			borderColor='border.medium'
			{...props}
		/>
	);
};

export default Container;
