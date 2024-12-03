import { Text, View } from '@atomic';
import { healthApiSlice } from '@flux/api/health';
import { useEnvContext } from '@src/utils/contexts';
import React, { useEffect } from 'react';
import Config from 'react-native-config';

const Network = () => {
	const { data, error, isLoading } = healthApiSlice.useHealthQuery();
	const { env } = useEnvContext();

	useEffect(() => {
		console.log(Config);
		console.log(env);
		// fetch('http://172.20.10.5:3000/health')
		// 	.then(async (res) => {
		// 		const d = await res.json();
		// 		console.log(d);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	}, []);
	console.log(data);
	return (
		<View margin='m'>
			<Text variant='page-header'>Network</Text>
			<Text>{data}</Text>
		</View>
	);
};

export default Network;
