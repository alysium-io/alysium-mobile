import { Icon, View } from '@atomic';
import React, { useEffect } from 'react';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';
import { ButtonThemeSettings } from '../Button';

interface SuccessProps {
	settings: ButtonThemeSettings;
}

const Success: React.FC<SuccessProps> = ({ settings }) => {
	const animatedValue = useSharedValue<number>(0);

	useEffect(() => {
		animatedValue.value = withTiming(1, { duration: 400 });
	}, []);

	const animatedContainer = useAnimatedStyle(() => {
		return {
			width: `${Math.round(animatedValue.value * 100)}%`
		};
	}, []);

	return (
		<View>
			<View animated style={animatedContainer} overflow='hidden'>
				<Icon name='checkmark' size='m' color={settings.textColor} />
			</View>
		</View>
	);
};

export default Success;
