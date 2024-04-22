import { useState } from 'react';

interface IUseToggleButton {
	value: boolean;
	setValue: (value: boolean) => void;
	toggle: () => void;
}

const useToggleButton = (defaultValue: boolean = false): IUseToggleButton => {
	const [value, setValue] = useState(defaultValue);
	const toggle = () => setValue(!value);

	return {
		value,
		setValue,
		toggle
	};
};

export default useToggleButton;
