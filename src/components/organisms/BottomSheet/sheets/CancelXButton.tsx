import { HeaderIconButton } from '@organisms';
import React from 'react';
import { useFullScreenSheet } from './useFullScreenSheet';

const CancelXButton = () => {
	const { sheetApi } = useFullScreenSheet();
	return <HeaderIconButton name='x' onPress={sheetApi.close} size='xl' />;
};

export default CancelXButton;
