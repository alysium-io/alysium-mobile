import { useSheet } from '@hooks';
import { BottomSheet } from '@organisms';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	NavigationContainer,
	NavigationIndependentTree
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Types
interface Contact {
	id: string;
	name: string;
	phone: string;
}

type ContactStackParamList = {
	ContactsList: undefined;
	ContactDetail: { contact: Contact };
};

type HomeStackParamList = {
	ButtonsScreen: undefined;
	DummyScreen: undefined;
};

type TabParamList = {
	HomeTab: undefined;
	SettingsTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ContactStack = createNativeStackNavigator<ContactStackParamList>();

// Mock contacts data
const CONTACTS: Contact[] = [
	{ id: '1', name: 'John Doe', phone: '+1 234 567 8900' },
	{ id: '2', name: 'Jane Smith', phone: '+1 234 567 8901' },
	{ id: '3', name: 'Mike Johnson', phone: '+1 234 567 8902' }
];

// Contact Navigator Component
const ContactNavigator = () => {
	return (
		<NavigationIndependentTree>
			<NavigationContainer>
				<ContactStack.Navigator
					screenOptions={{
						headerShown: true
					}}
				>
					<ContactStack.Screen
						name='ContactsList'
						component={ContactsListScreen}
						options={{
							title: 'Contacts',
							headerLeft: () => null
						}}
					/>
					<ContactStack.Screen
						name='ContactDetail'
						component={ContactDetailScreen}
						options={{
							title: 'Contact Details',
							headerBackButtonDisplayMode: 'minimal',
							headerTintColor: '#111'
						}}
					/>
				</ContactStack.Navigator>
			</NavigationContainer>
		</NavigationIndependentTree>
	);
};

// Regular Screens
const DummyScreen = () => (
	<View style={styles.screenContainer}>
		<Text>Dummy Screen</Text>
	</View>
);

const SettingsTabScreen = () => (
	<View style={styles.screenContainer}>
		<Text>Settings Tab</Text>
	</View>
);

// Contact List Screen
const ContactsListScreen: React.FC<
	NativeStackScreenProps<ContactStackParamList, 'ContactsList'>
> = ({ navigation }) => {
	return (
		<View style={styles.screenContainer}>
			{CONTACTS.map((contact) => (
				<TouchableOpacity
					key={contact.id}
					style={styles.contactItem}
					onPress={() => navigation.navigate('ContactDetail', { contact })}
				>
					<Text style={styles.contactName}>{contact.name}</Text>
					<Text style={styles.contactPhone}>{contact.phone}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

// Contact Detail Screen
const ContactDetailScreen: React.FC<
	NativeStackScreenProps<ContactStackParamList, 'ContactDetail'>
> = ({ route }) => {
	const { contact } = route.params;

	return (
		<View style={styles.screenContainer}>
			<View style={styles.contactDetailCard}>
				<Text style={styles.detailName}>{contact.name}</Text>
				<Text style={styles.detailPhone}>{contact.phone}</Text>
				<Text style={styles.detailText}>
					Additional contact details would go here...
				</Text>
			</View>
		</View>
	);
};

const ButtonsScreen: React.FC<
	NativeStackScreenProps<HomeStackParamList, 'ButtonsScreen'>
> = ({ navigation }) => {
	const sheetApi = useSheet();

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[styles.button, { top: '30%' }]}
				onPress={() => navigation.navigate('DummyScreen')}
			>
				<Text style={styles.buttonText}>Go to Dummy</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.button, { top: '50%' }]}
				onPress={() => sheetApi.open()}
			>
				<Text style={styles.buttonText}>Show Contacts</Text>
			</TouchableOpacity>

			<BottomSheet sheetRef={sheetApi.sheetRef} snapPoints={['80%']}>
				<ContactNavigator />
			</BottomSheet>
		</View>
	);
};

const HomeStackScreen = () => (
	<HomeStack.Navigator>
		<HomeStack.Screen name='ButtonsScreen' component={ButtonsScreen} />
		<HomeStack.Screen name='DummyScreen' component={DummyScreen} />
	</HomeStack.Navigator>
);

const App = () => (
	<Tab.Navigator>
		<Tab.Screen name='HomeTab' component={HomeStackScreen} />
		<Tab.Screen name='SettingsTab' component={SettingsTabScreen} />
	</Tab.Navigator>
);

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	button: {
		position: 'absolute',
		left: '50%',
		transform: [{ translateX: -75 }, { translateY: -25 }],
		backgroundColor: '#2196F3',
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderRadius: 10,
		width: 150,
		alignItems: 'center'
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600'
	},
	screenContainer: {
		flex: 1,
		padding: 16,
		justifyContent: 'center',
		alignItems: 'center'
	},
	contactItem: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#eee'
	},
	contactName: {
		fontSize: 16,
		fontWeight: '600'
	},
	contactPhone: {
		fontSize: 14,
		color: '#666',
		marginTop: 4
	},
	contactDetailCard: {
		padding: 20,
		borderRadius: 12
	},
	detailName: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 8
	},
	detailPhone: {
		fontSize: 18,
		color: '#666',
		marginBottom: 16
	},
	detailText: {
		fontSize: 16,
		color: '#888'
	}
});

export default App;
