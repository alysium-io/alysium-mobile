import { Text, View } from '@atomic';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScrollViewOverflow = () => {
	const Header = () => (
		<View
			style={{ backgroundColor: 'transparent' }}
			flexDirection='row'
			justifyContent='space-between'
			alignItems='center'
			marginVertical='xl'
			zIndex={999} // make sure the header is on top
		>
			<Text variant='page-header'>Hello World</Text>
			<Text variant='page-header'>Hello World</Text>
		</View>
	);

	return (
		<SafeAreaView>
			<Header />
			<ScrollView
				style={{
					overflow: 'visible' // this is the key to make the content overflow visible under the header
				}}
			>
				{Array.from({ length: 100 }).map((_, i) => (
					<View
						key={i}
						style={{ backgroundColor: 'red', height: 100 }}
						margin='m'
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default ScrollViewOverflow;
