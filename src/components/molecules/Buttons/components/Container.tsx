import { View } from '@atomic';
import React from 'react';

type ContainerProps = React.ComponentProps<typeof View> & {};

const Container: React.FC<ContainerProps> = (props) => {
	return (
		<View
			flexDirection='row'
			alignItems='center'
			justifyContent='center'
			borderRadius='round'
			padding='m'
			{...props}
		/>
	);
};

export default Container;
