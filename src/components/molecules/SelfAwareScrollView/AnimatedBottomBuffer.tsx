import { View } from '@atomic';
import React from 'react';
import { useAnimatedStyle } from 'react-native-reanimated';

interface AnimatedBottomBufferProps {
	animatedBottomBlockStyle: ReturnType<typeof useAnimatedStyle>;
}

const AnimatedBottomBuffer: React.FC<AnimatedBottomBufferProps> = ({
	animatedBottomBlockStyle
}) => <View animated style={animatedBottomBlockStyle} />;

export default AnimatedBottomBuffer;
