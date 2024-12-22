import { Text, View } from '@atomic';
import LottieView from 'lottie-react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Lottie = () => {
	const insets = useSafeAreaInsets();
	return (
		<View style={{ marginTop: insets.top }}>
			<Text>Lottie</Text>
			<LottieView
				source={require('src/assets/lottie/confetti.lottie')}
				autoPlay
				loop
				style={{ height: 500 }}
			/>
		</View>
	);
};

export default Lottie;
