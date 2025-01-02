import { Props } from '@types';
import React from 'react';
import RNLinearGradient from 'react-native-linear-gradient';

type LinearGradientProps = Props<typeof RNLinearGradient>;

const LinearGradient: React.FC<LinearGradientProps> = ({ ...props }) => {
	return <RNLinearGradient {...props} />;
};

export default LinearGradient;
