import { BlurView, QRCode, Text, View } from '@atomic';
import { Vibrator } from '@etc';
import { useTheme } from '@hooks';
import { Button } from '@molecules';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';
import ViewShot from 'react-native-view-shot';

// Define the stack parameter list type for Home stack
type HomeStackParamList = {
	Main: undefined;
	Page: { uid: string };
	TransitionScreen: { uid: string };
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

// Create individual screen components
const MainScreen = ({ navigation }: any) => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Main Screen</Text>
			<Button
				text='Go to Page 1'
				onPress={() => navigation.navigate('Page', { uid: '123' })}
			/>
			<Button
				text='Go to Page 2'
				onPress={() => navigation.navigate('Page', { uid: '456' })}
			/>
		</View>
	);
};

const PageScreen = ({ navigation, route }: any) => {
	const { theme } = useTheme();
	const { uid } = route.params;
	const [state, setState] = useState(0);
	useEffect(() => {
		setState(state + 1);
	}, []);
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Page {uid}</Text>
			<TouchableWithoutFeedback
				onPress={() => {
					Vibrator.soft();
					navigation.navigate('TransitionScreen', { uid });
				}}
			>
				<Animated.View
					style={{
						borderRadius: 35,
						backgroundColor: theme.colors['palette.neutral.p1'],
						shadowColor: theme.colors['text.p'],
						padding: theme.spacing['m'],
						shadowOffset: { width: 0, height: 0 },
						shadowOpacity: 0.25,
						shadowRadius: 3.84
					}}
					sharedTransitionTag={`page-qr-code-${uid}`}
				>
					<QRCode
						data={`page-qr-code-${uid}`}
						color={theme.colors['palette.neutral.p9']}
						size={5}
					/>
				</Animated.View>
			</TouchableWithoutFeedback>
		</View>
	);
};

const TransitionScreen = ({ navigation, route }: any) => {
	const { theme } = useTheme();
	const viewShotRef = useRef<ViewShot>(null);
	const { uid } = route.params;
	return (
		<BlurView
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
		>
			<Text>Page {uid} Transition</Text>
			<TouchableWithoutFeedback onPress={() => navigation.goBack()}>
				<Animated.View
					style={{
						borderRadius: 35,
						backgroundColor: theme.colors['palette.neutral.p1'],
						shadowColor: theme.colors['bg.negative.p'],
						padding: theme.spacing['m'],
						shadowOffset: { width: 0, height: 0 },
						shadowOpacity: 0.25,
						shadowRadius: 3.84
					}}
					sharedTransitionTag={`page-qr-code-${uid}`}
				>
					<ViewShot ref={viewShotRef}>
						<QRCode
							data={`page-qr-code-${uid}`}
							size={5}
							color={theme.colors['palette.neutral.p9']}
						/>
					</ViewShot>
				</Animated.View>
			</TouchableWithoutFeedback>
		</BlurView>
	);
};

const ReanimaedSharedTransitionHangingBug = () => {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen name='Main' component={MainScreen} />
			<HomeStack.Screen name='Page' component={PageScreen} />
			<HomeStack.Screen
				name='TransitionScreen'
				component={TransitionScreen}
				options={{
					animation: 'fade',
					gestureEnabled: false,
					animationDuration: 300,
					presentation: 'transparentModal',
					contentStyle: {
						backgroundColor: 'transparent'
					}
				}}
			/>
		</HomeStack.Navigator>
	);
};

export default ReanimaedSharedTransitionHangingBug;
