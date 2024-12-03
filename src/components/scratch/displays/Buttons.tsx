import { Text, View } from '@atomic';
import { Button, useButtonState } from '@molecules';
import { Props } from '@types';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RenderButton: React.FC<Props<typeof Button>> = (props) => (
	<View marginBottom='m'>
		<Button {...props} />
	</View>
);

const Buttons = () => {
	const insets = useSafeAreaInsets();

	const setLoadingButtonApiState = useButtonState();
	const successButtonApiState = useButtonState();
	const onPressLoadingButton = () => {
		setLoadingButtonApiState.setButtonState('loading');
		setTimeout(() => {
			setLoadingButtonApiState.setButtonState('active');
		}, 2000);
	};

	return (
		<ScrollView contentContainerStyle={{ paddingTop: insets.top }}>
			<View margin='m'>
				<View marginBottom='m'>
					<Text variant='section-header-2' marginBottom='m'>
						Dynamic
					</Text>
					<View flexDirection='row'>
						<View flex={1} marginRight='s'>
							<Button
								text='Set Loading'
								onPress={onPressLoadingButton}
								buttonState={setLoadingButtonApiState.buttonState}
							/>
						</View>
						<View flex={1} marginLeft='s'>
							<Button
								text='Success'
								onPress={successButtonApiState.buttonSuccess}
								buttonState={successButtonApiState.buttonState}
							/>
						</View>
					</View>
				</View>
				<View marginBottom='m'>
					<Text variant='section-header-2' marginBottom='m'>
						Solid
					</Text>
					<RenderButton text='Done' variant='solid' color='default' />
					<RenderButton text='Done' variant='solid' color='p' />
					<RenderButton text='Done' variant='solid' color='s' />
					<RenderButton text='Done' variant='solid' color='t' />
					<RenderButton text='Done' variant='solid' color='q' />
					<RenderButton
						text='Disabled'
						variant='solid'
						buttonState='disabled'
					/>
					<RenderButton text='Done' variant='solid' buttonState='loading' />
				</View>
				<View marginBottom='m'>
					<Text variant='section-header-2' marginBottom='m'>
						Outlined
					</Text>
					<RenderButton text='Done' variant='outlined' color='default' />
					<RenderButton text='Done' variant='outlined' color='p' />
					<RenderButton text='Done' variant='outlined' color='s' />
					<RenderButton text='Done' variant='outlined' color='t' />
					<RenderButton text='Done' variant='outlined' color='q' />
					<RenderButton
						text='Disabled'
						variant='outlined'
						buttonState='disabled'
					/>
					<RenderButton text='Done' variant='outlined' buttonState='loading' />
				</View>
			</View>
		</ScrollView>
	);
};

export default Buttons;
