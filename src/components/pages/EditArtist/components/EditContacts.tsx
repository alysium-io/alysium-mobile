import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Section, Text } from '@atomic';
import { useNavigation, useSheet } from '@hooks';
import { MenuListItem } from '@molecules';
import { CreateContactBottomSheet } from '@popups';
import React from 'react';
import Separator from './Separator';

const EditContactsSection = () => {
	const createContactBottomSheetApi = useSheet();
	const { artistData } = useArtistAppContext();
	const { editContactPage } = useNavigation();

	return (
		<Section>
			<Text margin='m' variant='section-header-2'>
				Contacts
			</Text>
			<MenuListItem
				titleTextProps={{
					title: 'Create Contact',
					bottomSubtext: 'Managers, booking agents, etc.',
					titleVariant: 'paragraph-medium'
				}}
				icon='plus'
				onPress={createContactBottomSheetApi.open}
			/>
			{artistData.contacts.map((contact, idx) => (
				<MenuListItem
					key={contact.contact_uid}
					titleTextProps={{
						title: contact.name,
						bottomSubtext: contact.role || 'Role not specified',
						titleVariant: 'paragraph-medium'
					}}
					onPress={() => editContactPage(contact)}
					containerProps={{ border: idx !== artistData.contacts.length - 1 }}
				/>
			))}
			<Separator marginTop='xl' />
			<CreateContactBottomSheet sheetApi={createContactBottomSheetApi} />
		</Section>
	);
};

export default EditContactsSection;
