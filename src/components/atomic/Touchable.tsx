import { View } from '@atomic';
import React from 'react';
import { TapGestureHandler } from 'react-native-gesture-handler';

interface TouchableProps {
	children: React.ReactNode;
	onPress?: () => void;
	onPressIn?: () => void;
	onPressOut?: () => void;
	hitSlop?: number;
	containerProps?: React.ComponentProps<typeof View>;
}

const Touchable: React.FC<TouchableProps> = ({
	children,
	onPress,
	onPressIn,
	onPressOut,
	hitSlop = 10,
	containerProps
}) => {
	return (
		<TapGestureHandler
			onActivated={onPress}
			onBegan={onPressIn}
			onEnded={onPressOut}
			numberOfTaps={1}
			hitSlop={{ top: hitSlop, bottom: hitSlop, left: hitSlop, right: hitSlop }}
		>
			<View {...containerProps}>{children}</View>
		</TapGestureHandler>
	);
};

export default Touchable;
