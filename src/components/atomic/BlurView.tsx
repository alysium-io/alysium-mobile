import { useTheme } from '@hooks';
import { BlurView as RNBlurView } from '@react-native-community/blur';
import { Props } from '@types';
import React from 'react';

type BlurViewProps = Props<typeof RNBlurView>;

const BlurView: React.FC<BlurViewProps> = ({ ...props }) => {
	const { theme } = useTheme();
	return <RNBlurView blurType={theme.colors['etc.blur']} {...props} />;
};

export default BlurView;
