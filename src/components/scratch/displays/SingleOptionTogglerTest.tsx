import { useTheme } from '@hooks';
import { SingleOptionRadioToggler } from '@molecules';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SingleOptionTogglerTest = () => {
	const { colorModeState } = useTheme();

	const onChange = (id: string) => {
		console.log(id);
	};

	return (
		<SafeAreaView>
			<SingleOptionRadioToggler
				defaultId={colorModeState}
				onChange={onChange}
				items={[
					{
						id: 'default',
						titleTextProps: {
							title: 'default',
							titleVariant: 'paragraph-medium',
							bottomSubtext: 'woah'
						}
					},
					{
						id: 'alwaysLight',
						titleTextProps: {
							title: 'always light',
							titleVariant: 'paragraph'
						}
					},
					{
						id: 'alwaysDark',
						titleTextProps: {
							title: 'always dark',
							titleVariant: 'paragraph'
						}
					}
				]}
			/>
		</SafeAreaView>
	);
};

export default SingleOptionTogglerTest;
