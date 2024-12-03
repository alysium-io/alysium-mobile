import { Text, View } from '@atomic';
import { Button } from '@molecules';
import {
	NavigationContainer,
	RouteProp,
	useNavigation
} from '@react-navigation/native';
import {
	createNativeStackNavigator,
	NativeStackNavigationProp
} from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
	SharedTransition,
	withSpring
} from 'react-native-reanimated';

export const Stack = createNativeStackNavigator();

const bouncyTransition = SharedTransition.custom((values) => {
	'worklet';
	return {
		height: withSpring(values.targetHeight),
		width: withSpring(values.targetWidth),
		originX: withSpring(values.targetOriginX),
		originY: withSpring(values.targetOriginY),
		borderRadius: withSpring(values.targetBorderRadius)
	};
});

export type RootStackParamList = {
	HomePage: undefined;
	DetailsPage: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'HomePage'
>;
export type DetailScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'DetailsPage'
>;
export type DetailScreenRouteProp = RouteProp<
	RootStackParamList,
	'DetailsPage'
>;

const DetailsPage = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const back = () => {
		navigation.goBack();
	};
	return (
		<View flex={1} justifyContent='center'>
			<Text>Details Page</Text>
			<Button text='Back' onPress={back} />
			<Animated.View
				sharedTransitionTag='box'
				sharedTransitionStyle={bouncyTransition}
				style={styles.box2}
			/>
		</View>
	);
};

const HomePage = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const goToDetails = () => {
		navigation.navigate('DetailsPage');
	};
	return (
		<View flex={1} justifyContent='center' alignItems='center'>
			<Text>Home Page</Text>
			<Button text='Details' onPress={goToDetails} />
			<Animated.View
				sharedTransitionTag='box'
				sharedTransitionStyle={bouncyTransition}
				style={styles.box1}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	box1: {
		backgroundColor: 'red',
		borderRadius: 5,
		height: 100,
		width: 100
	},
	box2: {
		backgroundColor: 'red',
		borderRadius: 50,
		height: 200,
		width: 200
	}
});

const TransitionMaster = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='HomePage' component={HomePage} />
				<Stack.Screen
					name='DetailsPage'
					component={DetailsPage}
					options={{
						presentation: 'transparentModal',
						animation: 'fade'
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default TransitionMaster;
