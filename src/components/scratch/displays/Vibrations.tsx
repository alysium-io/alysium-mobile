import { Text, View } from '@atomic';
import { Vibrator } from '@etc';
import { MenuListItem } from '@molecules';
import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Vibrations = () => {
	const { top } = useSafeAreaInsets();
	return (
		<View style={{ marginTop: top }}>
			<ScrollView>
				<Text variant='section-header-2' textAlign='center' margin='m'>
					Vibrations
				</Text>
				<MenuListItem
					titleTextProps={{ title: 'Light' }}
					onPress={() => Vibrator.light()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Medium' }}
					onPress={() => Vibrator.medium()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Heavy' }}
					onPress={() => Vibrator.heavy()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Selection' }}
					onPress={() => Vibrator.selection()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Rigid' }}
					onPress={() => Vibrator.rigid()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Soft' }}
					onPress={() => Vibrator.soft()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Notification Success' }}
					onPress={() => Vibrator.notificationSuccess()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Notification Warning' }}
					onPress={() => Vibrator.notificationWarning()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Notification Error' }}
					onPress={() => Vibrator.notificationError()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Clock Tick' }}
					onPress={() => Vibrator.clockTick()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Context Click' }}
					onPress={() => Vibrator.contextClick()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Keyboard Press' }}
					onPress={() => Vibrator.keyboardPress()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Keyboard Release' }}
					onPress={() => Vibrator.keyboardRelease()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Keyboard Tap' }}
					onPress={() => Vibrator.keyboardTap()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Long Press' }}
					onPress={() => Vibrator.longPress()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Text Handle Move' }}
					onPress={() => Vibrator.textHandleMove()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Virtual Key' }}
					onPress={() => Vibrator.virtualKey()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Virtual Key Release' }}
					onPress={() => Vibrator.virtualKeyRelease()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Effect Click' }}
					onPress={() => Vibrator.effectClick()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Effect Double Click' }}
					onPress={() => Vibrator.effectDoubleClick()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Effect Heavy Click' }}
					onPress={() => Vibrator.effectHeavyClick()}
				/>
				<MenuListItem
					titleTextProps={{ title: 'Effect Tick' }}
					onPress={() => Vibrator.effectTick()}
				/>
			</ScrollView>
		</View>
	);
};

export default Vibrations;
