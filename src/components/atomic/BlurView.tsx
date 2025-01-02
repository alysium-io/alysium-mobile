import { BlurView as RNBlurView } from '@react-native-community/blur';
import { Props } from '@types';
import React from 'react';

type BlurViewProps = Props<typeof RNBlurView>;

const BlurView: React.FC<BlurViewProps> = ({ ...props }) => {
	return <RNBlurView {...props} />;
};

export default BlurView;
