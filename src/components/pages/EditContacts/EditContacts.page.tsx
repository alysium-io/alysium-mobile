import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import { BasePage } from '@organisms';
import React from 'react';
import EditContactsPageHeader from './EditContacts.header';

const EditContactsPage = () => {
	const { artistData } = useArtistAppContext();
	const { editContactPage, createContactPage } = useNavigation();
	return (
		<BasePage>
			<EditContactsPageHeader />
			<View>
				<ContentListItem
					onPress={createContactPage}
					profileImageProps={{
						defaultImageProps: {
							icon: 'plus'
						},
						containerProps: {
							borderWidth: 1,
							borderRadius: 'round',
							borderColor: 'border.light'
						}
					}}
					titleTextProps={{
						title: 'Create Contact',
						bottomSubtext: 'Booking agent, manager, etc.',
						bottomSubtextColor: 'text.q'
					}}
				/>
				{artistData.contacts?.map((contact, index) => (
					<ContentListItem
						key={`$contact-${index}-${contact.contact_uid}`}
						onPress={() => editContactPage(contact)}
						profileImageProps={{
							defaultImageProps: {
								icon: 'old-phone'
							},
							containerProps: {
								borderWidth: 1,
								borderRadius: 'round',
								borderColor: 'border.light'
							}
						}}
						titleTextProps={{
							title: contact.name,
							bottomSubtext: contact.role ?? 'Role',
							bottomSubtextColor: 'text.q'
						}}
					/>
				))}
			</View>
		</BasePage>
	);
};

export default EditContactsPage;
