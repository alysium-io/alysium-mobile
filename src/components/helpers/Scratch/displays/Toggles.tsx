import { SingleOptionRadioToggler } from '@organisms';
import React from 'react';

const Toggles = () => {
	const onChange = (id: string) => {
		console.log('Selected id:', id);
	};
	return (
		<SingleOptionRadioToggler
			defaultId={undefined}
			onChange={onChange}
			items={[
				{
					id: '1',
					onPress: () => console.log('Option 1 pressed'),
					titleTextProps: {
						title: 'Option 1'
					}
				},
				{
					id: '2',
					onPress: () => console.log('Option 2 pressed'),
					titleTextProps: {
						title: 'Option 2',
						bottomSubtext: 'This is a subtext'
					}
				},
				{
					id: '3',
					onPress: () => console.log('Option 3 pressed'),
					titleTextProps: {
						title: 'Option 3',
						topSubtext: 'This is a subtext',
						topSubtextColor: 'subtext.s'
					}
				}
			]}
		/>
	);
};

export default Toggles;
