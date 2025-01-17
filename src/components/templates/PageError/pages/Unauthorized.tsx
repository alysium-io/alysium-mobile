import { View } from '@atomic';
import React from 'react';
import MainText from '../components/MainText';
import PageHeader from '../components/PageHeader';

const Unauthorized = () => {
	return (
		<View flex={1}>
			<PageHeader />
			<MainText title='Error 401' description='Unauthorized' />
		</View>
	);
};

export default Unauthorized;
