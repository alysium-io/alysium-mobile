import { View } from '@atomic';
import React from 'react';
import MainText from '../components/MainText';
import PageHeader from '../components/PageHeader';

const ErrorNotFound = () => {
	return (
		<View flex={1}>
			<PageHeader />
			<MainText title='Error 404' description='Page not found' />
		</View>
	);
};

export default ErrorNotFound;
