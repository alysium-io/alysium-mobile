import { useNavigation } from '@hooks';
import React from 'react';
import HeaderIconButton from './HeaderIconButton';

const HeaderBackButton = () => {
	const { back } = useNavigation();
	return <HeaderIconButton onPress={back} name='arrow-left' />;
};

export default HeaderBackButton;
