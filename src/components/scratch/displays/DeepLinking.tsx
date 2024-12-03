// App.tsx
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type {
	CompositeScreenProps,
	LinkingOptions,
	NavigatorScreenParams
} from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View } from 'react-native';

// Define the param lists for both navigators
type RootTabParamList = {
	Feed: undefined;
	Main: NavigatorScreenParams<MainStackParamList>;
};

type MainStackParamList = {
	MainScreen: undefined;
	Details: {
		id: string;
	};
};

// Create composite types for navigation props
type MainStackScreenProps<T extends keyof MainStackParamList> =
	CompositeScreenProps<
		NativeStackScreenProps<MainStackParamList, T>,
		BottomTabScreenProps<RootTabParamList>
	>;

// Screen components
const FeedScreen = () => (
	<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<Text>Feed Screen</Text>
	</View>
);

const MainScreen: React.FC<MainStackScreenProps<'MainScreen'>> = ({
	navigation
}) => (
	<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<Text>Main Screen</Text>
		<Button
			title='Go to Details'
			onPress={() => navigation.navigate('Details', { id: '123' })}
		/>
	</View>
);

const DetailsScreen: React.FC<MainStackScreenProps<'Details'>> = ({
	route
}) => (
	<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<Text>Details Screen</Text>
		<Text>ID: {route.params.id}</Text>
	</View>
);

// Set up Main stack
const MainStack = createNativeStackNavigator<MainStackParamList>();

function MainStackScreen() {
	return (
		<MainStack.Navigator>
			<MainStack.Screen
				name='MainScreen'
				component={MainScreen}
				options={{ title: 'Main Thing' }}
			/>
			<MainStack.Screen name='Details' component={DetailsScreen} />
		</MainStack.Navigator>
	);
}

// Set up bottom tabs
const Tab = createBottomTabNavigator<RootTabParamList>();

// Deep linking configuration
const linking: LinkingOptions<RootTabParamList> = {
	prefixes: ['alysium://', 'https://alysium.io'],
	config: {
		initialRouteName: 'Main',
		screens: {
			Feed: 'feed',
			Main: {
				initialRouteName: 'MainScreen',
				screens: {
					MainScreen: 'main',
					Details: {
						path: 'details/:id',
						parse: {
							id: (id: string) => id
						}
					}
				}
			}
		}
	}
};

function App() {
	return (
		<NavigationContainer linking={linking}>
			<Tab.Navigator initialRouteName='Main'>
				<Tab.Screen name='Main' component={MainStackScreen} />
				<Tab.Screen name='Feed' component={FeedScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

export default App;
