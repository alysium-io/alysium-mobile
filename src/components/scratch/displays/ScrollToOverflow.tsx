import React, { useRef } from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';

export default function ScrollOverflowDemo() {
	const scrollViewRef = useRef<ScrollView>(null);
	const contentHeight = 500;
	const scrollViewHeight = 300;
	const overscrollAmount = 100;

	const scrollToBottom = () => {
		scrollViewRef.current?.scrollTo({
			y: contentHeight - scrollViewHeight + overscrollAmount,
			animated: true
		});
	};

	const scrollToNormal = () => {
		scrollViewRef.current?.scrollTo({
			y: contentHeight - scrollViewHeight,
			animated: true
		});
	};

	return (
		<View style={styles.container}>
			<ScrollView
				ref={scrollViewRef}
				style={styles.scrollView}
				scrollToOverflowEnabled={true}
			>
				<View style={[styles.content, { height: contentHeight }]}>
					<View style={styles.colorBlock} />
				</View>
			</ScrollView>
			<View style={styles.buttons}>
				<Button title='Scroll Past Bottom' onPress={scrollToBottom} />
				<Button title='Normal Scroll' onPress={scrollToNormal} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	scrollView: {
		height: 300,
		backgroundColor: '#f0f0f0'
	},
	content: {
		backgroundColor: '#e0e0e0'
	},
	colorBlock: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 200,
		backgroundColor: '#4a90e2'
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10
	}
});
