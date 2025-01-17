import { View } from '@atomic';
import React from 'react';
import MainText from '../components/MainText';
import PageHeader from '../components/PageHeader';

const Forbidden = () => {
	return (
		<View flex={1}>
			<PageHeader />
			<MainText title='Error 403' description='Forbidden' />
		</View>
	);
};

export default Forbidden;
