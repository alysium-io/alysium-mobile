import { Text, View } from '@atomic';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useKeyboard, useSearch, useTheme } from '@hooks';
import { ContentListItem } from '@molecules';
import { BottomSheet, SearchBar } from '@organisms';
import React, { useState } from 'react';
import { Case, Switch } from 'react-if';
import { ScrollView } from 'react-native';
import Contacts from 'react-native-contacts';
import { Contact } from 'react-native-contacts/type';

interface ContactPickerBottomSheetProps {
	sheetApi: SheetApi;
	onSelect: (contact: Contact) => void;
}

const ContactPickerBottomSheet: React.FC<ContactPickerBottomSheetProps> = ({
	sheetApi,
	onSelect
}) => {
	const [searchResults, setSearchResults] = useState<Contact[]>([]);
	const { theme } = useTheme();
	const { dismiss } = useKeyboard();

	const searchApi = useSearch({
		methods: {
			onChangeText: (text) => {
				Contacts.getContactsMatchingString(text).then(setSearchResults);
			}
		}
	});

	const onChange = (index: number) => {
		if (index === 0) {
			searchApi.textInputApi.focus();
		}
	};

	const _onSelect = (contact: Contact) => {
		onSelect(contact);
		sheetApi.close();
	};

	const onDismiss = () => {
		setSearchResults([]);
		searchApi.reset();
	};

	return (
		<BottomSheet
			ref={sheetApi.sheetRef}
			snapPoints={['85%']}
			onChange={onChange}
			onDismiss={onDismiss}
		>
			<BottomSheetView style={{ flex: 1 }}>
				<View flex={1}>
					<View
						borderBottomWidth={theme.borderWidth.normal}
						borderBottomColor='border.light'
					>
						<View margin='m'>
							<SearchBar
								searchApi={searchApi}
								placeholder='Search Contacts...'
							/>
						</View>
					</View>
					<Switch>
						<Case condition={searchApi.isEmpty}>
							<View margin='m'>
								<Text
									variant='paragraph-large'
									color='text.q'
									textAlign='center'
								>
									Import a contact from your address book.
								</Text>
							</View>
						</Case>
						<Case condition={!searchApi.isEmpty && searchResults.length === 0}>
							<View margin='m'>
								<Text
									variant='paragraph-large'
									color='text.q'
									textAlign='center'
								>
									No contacts found.
								</Text>
							</View>
						</Case>
						<Case condition={searchResults.length > 0}>
							<ScrollView onScrollBeginDrag={dismiss} alwaysBounceVertical>
								{searchResults.map((contact) => (
									<ContentListItem
										key={contact.recordID}
										titleTextProps={{
											title: contact.givenName + ' ' + contact.familyName,
											bottomSubtext: contact.phoneNumbers[0]?.number,
											bottomSubtextColor: 'text.q'
										}}
										profileImageProps={{
											image: contact.hasThumbnail
												? contact.thumbnailPath
												: undefined,
											defaultImageProps: {
												icon: 'user'
											}
										}}
										onPress={() => _onSelect(contact)}
									/>
								))}
							</ScrollView>
						</Case>
					</Switch>
				</View>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default ContactPickerBottomSheet;
