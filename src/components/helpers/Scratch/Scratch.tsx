import { View } from '@atomic';
import { eventApiSlice } from '@flux/api/event';
import { useSheet } from '@hooks';
import { Button } from '@molecules';
import { ShareExternal } from '@organisms';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Scratch = () => {
	const insets = useSafeAreaInsets();
	const sheetApi = useSheet();
	const { data } = eventApiSlice.useFindOneEventQuery({
		params: { event_uid: 'shb6NXi16K9sQ6V154SkofmD' }
	});

	if (!data) {
		return null;
	}

	return (
		<View flex={1} style={{ marginTop: insets.top }}>
			<Button text='Open Share Modal' onPress={() => sheetApi.open()} />
			<ShareExternal event={data} sheetApi={sheetApi} />
		</View>
	);
};

export default Scratch;
