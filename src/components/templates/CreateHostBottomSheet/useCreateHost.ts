import { useTextInput } from '@hooks';
import { hostApiSlice } from 'src/redux/api/host';

const { useCreateMutation } = hostApiSlice;

interface IUseCreateHost {
	newHostText: React.RefObject<string>;
	setNewHostText: (newHostName: string) => void;
	submitNewHost: () => void;
	onDismiss: () => void;
}

const useCreateHost = (): IUseCreateHost => {
	const {
		text: newHostText,
		setText: setNewHostText,
		reset: resetNewHostText
	} = useTextInput();

	const [createHost] = useCreateMutation();

	const submitNewHost = () => {
		if (newHostText.current)
			createHost({ body: { name: newHostText.current } });
	};

	const onDismiss = () => resetNewHostText();

	return {
		newHostText,
		setNewHostText,
		submitNewHost,
		onDismiss
	};
};

export default useCreateHost;
