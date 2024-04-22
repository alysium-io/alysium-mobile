import { useTextInput } from '@hooks';
import { artistApiSlice } from 'src/redux/api/artist';

const { useCreateMutation } = artistApiSlice;

interface IUseCreateArtist {
	newArtistText: React.RefObject<string>;
	setNewArtistText: (newArtistName: string) => void;
	submitNewArtist: () => void;
	onDismiss: () => void;
}

const useCreateArtist = (): IUseCreateArtist => {
	const {
		text: newArtistText,
		setText: setNewArtistText,
		reset: resetNewArtistText
	} = useTextInput();

	const [createArtist] = useCreateMutation();

	const submitNewArtist = () => {
		if (newArtistText.current)
			createArtist({ body: { name: newArtistText.current } });
	};

	const onDismiss = () => resetNewArtistText();

	return {
		newArtistText,
		setNewArtistText,
		submitNewArtist,
		onDismiss
	};
};

export default useCreateArtist;
