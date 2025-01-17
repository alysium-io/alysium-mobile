import { View } from '@atomic';
import React from 'react';
import MainText from '../components/MainText';
import PageHeader from '../components/PageHeader';

const ServerError = () => {
	return (
		<View flex={1}>
			<PageHeader />
			<MainText title='Error 500' description='Server error' />
		</View>
	);
};

export default ServerError;
