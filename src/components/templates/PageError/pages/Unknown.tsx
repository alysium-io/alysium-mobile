import { View } from '@atomic';
import React from 'react';
import MainText from '../components/MainText';
import PageHeader from '../components/PageHeader';

const Unknown = () => {
	return (
		<View flex={1}>
			<PageHeader />
			<MainText title='Error 500' description='Unknown error' />
		</View>
	);
};

export default Unknown;
