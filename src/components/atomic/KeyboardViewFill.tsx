import { View } from '@atomic';
import { useKeyboard } from '@hooks';
import React from 'react';

const KeyboardViewFill = () => {
	const { height } = useKeyboard();
	return <View style={{ height }} />;
};

export default KeyboardViewFill;
