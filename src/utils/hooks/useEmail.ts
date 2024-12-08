import { openComposer } from 'react-native-email-link';

interface IuseEmail {
	handleEmail: (email: string) => Promise<void>;
}

const useEmail = (): IuseEmail => {
	const handleEmail = async (email: string) => {
		try {
			await openComposer({
				to: email
			});
		} catch (error) {
			console.error('Error opening email:', error);
		}
	};

	return {
		handleEmail
	};
};

export default useEmail;
