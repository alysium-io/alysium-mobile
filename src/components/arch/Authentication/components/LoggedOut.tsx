import { BasePage } from '@organisms';
import React from 'react';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import Body from './Body';
import Footer from './Footer';

const LoggedOut = () => {
	return (
		<BasePage>
			<LayoutAnimationConfig skipEntering>
				<Body />
				<Footer />
			</LayoutAnimationConfig>
		</BasePage>
	);
};

export default LoggedOut;
