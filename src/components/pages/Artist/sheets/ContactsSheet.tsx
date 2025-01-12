import { Text } from '@atomic';
import { Formatting } from '@etc';
import { Contact } from '@flux/api/contact';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { SheetApi, useClipboard, useEmail, usePhone, useTheme } from '@hooks';
import { MenuListItem, MenuListItemWithButton } from '@molecules';
import { BottomSheet } from '@organisms';
import {
	NavigationContainer,
	NavigationIndependentTree
} from '@react-navigation/native';
import {
	createNativeStackNavigator,
	NativeStackScreenProps
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Case, Switch } from 'react-if';

type RootStackParamList = {
	ContactsList: undefined;
	ContactDetail: { contact: Contact };
};

type ContactsListScreenProps = NativeStackScreenProps<
	RootStackParamList,
	'ContactsList'
> & {
	contacts: Contact[];
};
type ContactDetailScreenProps = NativeStackScreenProps<
	RootStackParamList,
	'ContactDetail'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const ContactsListScreen: React.FC<ContactsListScreenProps> = ({
	navigation,
	contacts
}) => {
	return (
		<BottomSheetScrollView>
			<Switch>
				<Case condition={contacts.length > 0}>
					{contacts.map((contact) => (
						<MenuListItem
							key={contact.contact_uid}
							onPress={() => navigation.navigate('ContactDetail', { contact })}
							titleTextProps={{
								title: contact.name,
								bottomSubtext: contact.role || 'Unknown role',
								titleVariant: 'paragraph-medium',
								bottomSubtextVariant: 'paragraph-small',
								bottomSubtextColor: 'text.q'
							}}
						/>
					))}
				</Case>
				<Case condition={contacts.length === 0}>
					<Text
						variant='paragraph-medium'
						margin='m'
						textAlign='center'
						color='text.q'
					>
						No contacts available
					</Text>
				</Case>
			</Switch>
		</BottomSheetScrollView>
	);
};

const ContactDetailScreen: React.FC<ContactDetailScreenProps> = ({ route }) => {
	const { contact } = route.params;
	const { copy } = useClipboard();
	const { theme } = useTheme();
	const { call } = usePhone();
	const { handleEmail } = useEmail();
	const phone_number = Formatting.formatPhoneNumber(contact.phone_number);
	const email = contact.email;
	return (
		<BottomSheetScrollView>
			<Text
				variant='paragraph'
				color='text.q'
				textAlign='center'
				marginVertical='m'
			>
				{contact.role}
			</Text>
			{phone_number && (
				<MenuListItemWithButton
					onPress={() => call(phone_number)}
					prefixIconProps={{ name: 'old-phone' }}
					onPressButton={() =>
						copy(phone_number, { text2: 'You can now share this phone number' })
					}
					buttonIconProps={{
						name: 'link'
					}}
					buttonIconContainerProps={{
						backgroundColor: 'bg.light',
						aspectRatio: 1,
						borderRadius: 'round',
						borderColor: 'border.light',
						borderWidth: theme.borderWidth.thin
					}}
					titleTextProps={{
						title: phone_number,
						bottomSubtext: 'Call',
						titleVariant: 'paragraph-medium',
						bottomSubtextVariant: 'paragraph-small',
						bottomSubtextColor: 'text.q'
					}}
				/>
			)}
			{email && (
				<MenuListItemWithButton
					onPress={() => handleEmail(email)}
					prefixIconProps={{ name: 'at' }}
					onPressButton={() =>
						copy(email, { text2: 'You can now share this email' })
					}
					buttonIconProps={{
						name: 'link'
					}}
					buttonIconContainerProps={{
						backgroundColor: 'bg.light',
						aspectRatio: 1,
						borderRadius: 'round',
						borderColor: 'border.light',
						borderWidth: theme.borderWidth.thin
					}}
					titleTextProps={{
						title: contact.email,
						bottomSubtext: 'Email',
						titleVariant: 'paragraph-medium',
						bottomSubtextVariant: 'paragraph-small',
						bottomSubtextColor: 'text.q'
					}}
				/>
			)}
		</BottomSheetScrollView>
	);
};

interface ContactsSheetProps {
	sheetApi: SheetApi;
	contacts: Contact[];
}

const ContactsSheet: React.FC<ContactsSheetProps> = ({
	sheetApi,
	contacts
}) => {
	const { theme } = useTheme();
	const ContactsListScreenFC = useCallback(
		(props: NativeStackScreenProps<RootStackParamList, 'ContactsList'>) => (
			<ContactsListScreen {...props} contacts={contacts} />
		),
		[contacts]
	);

	return (
		<BottomSheet sheetRef={sheetApi.sheetRef} snapPoints={['50%']}>
			<NavigationIndependentTree>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerStyle: {
								backgroundColor: theme.colors['bg.p']
							},
							headerTintColor: theme.colors['text.s'],
							headerTitleStyle: { color: theme.colors['text.p'] },
							headerBackButtonDisplayMode: 'minimal',
							contentStyle: {
								backgroundColor: theme.colors['bg.p']
							}
						}}
					>
						<Stack.Screen
							name='ContactsList'
							component={ContactsListScreenFC}
							options={{
								title: 'Contacts'
							}}
						/>
						<Stack.Screen
							name='ContactDetail'
							component={ContactDetailScreen}
							options={({ route }) => ({
								headerTitle: route.params.contact.name
							})}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</NavigationIndependentTree>
		</BottomSheet>
	);
};

export default ContactsSheet;
