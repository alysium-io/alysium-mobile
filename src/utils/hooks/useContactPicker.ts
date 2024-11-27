import { useState } from 'react';
import selectContact from 'react-native-select-contact';

export interface Contact {
	readonly name: string;
	readonly phone_number?: string | null;
	readonly email?: string | null;
}

const useContactPicker = () => {
	const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

	const pickContact = async () => {
		try {
			const contact = await selectContact.selectContact();
			if (!contact) return null;

			const formatted: Contact = {
				name: contact.name,
				phone_number: contact.phones[0]?.number ?? null,
				email: contact.emails[0]?.address ?? null
			};

			setSelectedContact(formatted);
			return formatted;
		} catch (error) {
			console.error('Error picking contact:', error);
			throw error;
		}
	};

	return {
		pickContact,
		selectedContact
	};
};

export default useContactPicker;
