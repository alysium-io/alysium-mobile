import { Text, View } from '@atomic';
import { Vibrator } from '@etc';
import { MenuListItem } from '@molecules';
import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Vibrations = () => {
	const { top } = useSafeAreaInsets();
	return (
		<View style={{ marginTop: top }} backgroundColor='bg.p'>
			<ScrollView>
				<Text variant='section-header-2' textAlign='center' margin='m'>
					Vibrations
				</Text>
				<MenuListItem
					titleTextProps={{
						title: 'Light',
						bottomSubtext: 'Vibrator.light()'
					}}
					onPress={() => Vibrator.light()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Medium',
						bottomSubtext: 'Vibrator.medium()'
					}}
					onPress={() => Vibrator.medium()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Heavy',
						bottomSubtext: 'Vibrator.heavy()'
					}}
					onPress={() => Vibrator.heavy()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Selection',
						bottomSubtext: 'Vibrator.selection()'
					}}
					onPress={() => Vibrator.selection()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Rigid',
						bottomSubtext: 'Vibrator.rigid()'
					}}
					onPress={() => Vibrator.rigid()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Soft',
						bottomSubtext: 'Vibrator.soft()'
					}}
					onPress={() => Vibrator.soft()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Notification Success',
						bottomSubtext: 'Vibrator.notificationSuccess()'
					}}
					onPress={() => Vibrator.notificationSuccess()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Notification Warning',
						bottomSubtext: 'Vibrator.notificationWarning()'
					}}
					onPress={() => Vibrator.notificationWarning()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Notification Error',
						bottomSubtext: 'Vibrator.notificationError()'
					}}
					onPress={() => Vibrator.notificationError()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Clock Tick',
						bottomSubtext: 'Vibrator.clockTick()'
					}}
					onPress={() => Vibrator.clockTick()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Context Click',
						bottomSubtext: 'Vibrator.contextClick()'
					}}
					onPress={() => Vibrator.contextClick()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Keyboard Press',
						bottomSubtext: 'Vibrator.keyboardPress()'
					}}
					onPress={() => Vibrator.keyboardPress()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Keyboard Release',
						bottomSubtext: 'Vibrator.keyboardRelease()'
					}}
					onPress={() => Vibrator.keyboardRelease()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Keyboard Tap',
						bottomSubtext: 'Vibrator.keyboardTap()'
					}}
					onPress={() => Vibrator.keyboardTap()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Long Press',
						bottomSubtext: 'Vibrator.longPress()'
					}}
					onPress={() => Vibrator.longPress()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Text Handle Move',
						bottomSubtext: 'Vibrator.textHandleMove()'
					}}
					onPress={() => Vibrator.textHandleMove()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Virtual Key',
						bottomSubtext: 'Vibrator.virtualKey()'
					}}
					onPress={() => Vibrator.virtualKey()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Virtual Key Release',
						bottomSubtext: 'Vibrator.virtualKeyRelease()'
					}}
					onPress={() => Vibrator.virtualKeyRelease()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Effect Click',
						bottomSubtext: 'Vibrator.effectClick()'
					}}
					onPress={() => Vibrator.effectClick()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Effect Double Click',
						bottomSubtext: 'Vibrator.effectDoubleClick()'
					}}
					onPress={() => Vibrator.effectDoubleClick()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Effect Heavy Click',
						bottomSubtext: 'Vibrator.effectHeavyClick()'
					}}
					onPress={() => Vibrator.effectHeavyClick()}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Effect Tick',
						bottomSubtext: 'Vibrator.effectTick()'
					}}
					onPress={() => Vibrator.effectTick()}
				/>
			</ScrollView>
		</View>
	);
};

export default Vibrations;
