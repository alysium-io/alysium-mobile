import { View } from '@atomic';
import React from 'react';
import MainText from '../components/MainText';
import PageHeader from '../components/PageHeader';

const BadRequest = () => {
	return (
		<View flex={1}>
			<PageHeader />
			<MainText title='Error 400' description='Bad Request' />
		</View>
	);
};

export default BadRequest;
