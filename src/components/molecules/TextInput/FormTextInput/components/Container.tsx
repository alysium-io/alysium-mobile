import { View } from '@atomic';
import { useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type ContainerProps = Props<typeof View> & {
	onPress?: () => void;
};

const Container: React.FC<ContainerProps> = ({ onPress, ...props }) => {
	const { theme } = useTheme();
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View
				flexDirection='row'
				paddingVertical='xl'
				borderBottomColor='border.light'
				borderBottomWidth={theme.borderWidth.normal}
				{...props}
			/>
		</TouchableWithoutFeedback>
	);
};

export default Container;
