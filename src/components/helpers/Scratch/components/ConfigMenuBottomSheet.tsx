import { Button, View } from '@atomic';
import {
	BottomSheetFooter,
	BottomSheetFooterProps,
	BottomSheetView
} from '@gorhom/bottom-sheet';
import { SheetApi, useLayoutDimensions, useTheme } from '@hooks';
import {
	BottomSheet,
	BottomSheetHeader,
	SingleOptionRadioToggler
} from '@organisms';
import { ThemePicker } from '@templates';
import { ColorModeState } from '@types';
import React, { useCallback } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ConfigMenuBottomSheetProps {
	sheetApi: SheetApi;
}

const ConfigMenuBottomSheet: React.FC<ConfigMenuBottomSheetProps> = ({
	sheetApi
}) => {
	const insets = useSafeAreaInsets();
	const { colorModeState, setColorModeState, theme } = useTheme();
	const { dimensions, onLayout } = useLayoutDimensions();

	const renderFooter = useCallback(
		(props: BottomSheetFooterProps) => {
			return (
				<BottomSheetFooter {...props}>
					<View
						margin='m'
						onLayout={onLayout}
						style={{
							marginBottom: insets.bottom
						}}
					>
						<Button text='Done' onPress={sheetApi.close} />
					</View>
				</BottomSheetFooter>
			);
		},
		[sheetApi]
	);

	const onChange = (id: string) => {
		setColorModeState(id as ColorModeState);
	};

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			snapPoints={['50%']}
			footerComponent={renderFooter}
		>
			<BottomSheetView
				style={{
					flex: 1,
					marginBottom: (dimensions?.height || 0) + insets.bottom
				}}
			>
				<BottomSheetHeader text='Config' />
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingBottom: theme.spacing.m
					}}
				>
					<ThemePicker />
					<SingleOptionRadioToggler
						defaultId={colorModeState}
						onChange={onChange}
						items={[
							{
								id: 'default',
								onPress: () => console.log('Option 1 pressed'),
								titleTextProps: {
									title: 'default',
									titleVariant: 'paragraph'
								}
							},
							{
								id: 'alwaysLight',
								onPress: () => console.log('Option 2 pressed'),
								titleTextProps: {
									title: 'always light',
									titleVariant: 'paragraph'
								}
							},
							{
								id: 'alwaysDark',
								onPress: () => console.log('Option 3 pressed'),
								titleTextProps: {
									title: 'always dark',
									titleVariant: 'paragraph'
								}
							}
						]}
					/>
				</ScrollView>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default ConfigMenuBottomSheet;
