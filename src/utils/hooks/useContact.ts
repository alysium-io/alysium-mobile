import { Contact as RNContact } from 'react-native-contacts/type';

type ExtractedContact = { name: string; phone_number?: string; email?: string };

interface IUseContact {
	extractContact: (contact: RNContact) => ExtractedContact;
}

const useContact = (): IUseContact => {
	const extractContact = (contact: RNContact): ExtractedContact => {
		const name = contact.givenName + ' ' + contact.familyName;
		const phone_number = contact.phoneNumbers[0]?.number;
		const email = contact.emailAddresses[0]?.email;
		return {
			name,
			phone_number,
			email
		};
	};

	return {
		extractContact
	};
};

export default useContact;
