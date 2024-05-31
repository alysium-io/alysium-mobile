import { Icon, Text, Touchable, View } from '@atomic';
import { useTheme } from '@hooks';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface MainButtonsProps {
	onPressFollowers: () => void;
	onPressShows: () => void;
	openLinks: () => void;
}

const MainButtons: React.FC<MainButtonsProps> = ({
	onPressFollowers,
	onPressShows,
	openLinks
}) => {
	const { theme } = useTheme();

	return (
		<View marginBottom='m'>
			<View marginVertical='m'>
				<View marginLeft='xs'>
					<View flexDirection='row' alignItems='center' marginBottom='m'>
						<Touchable onPress={onPressFollowers}>
							<TouchableOpacity>
								<Text variant='p3-secondary-light'>312K followers</Text>
							</TouchableOpacity>
						</Touchable>
						<Text variant='p3-secondary-light'> &middot; </Text>
						<Touchable onPress={onPressShows}>
							<TouchableOpacity>
								<Text variant='p3-secondary-light'>412 shows</Text>
							</TouchableOpacity>
						</Touchable>
						<Text variant='p3-secondary-light'> &middot; </Text>
						<Text variant='p3-secondary-light'>Amsterdam, Netherlands</Text>
					</View>
					<Text variant='p2-semibold' marginBottom='s' numberOfLines={1}>
						Dutch DJ & Producer
					</Text>
					<Touchable
						containerProps={{ style: { alignSelf: 'flex-start' } }}
						onPress={openLinks}
					>
						<TouchableOpacity>
							<View flexDirection='row' alignItems='center'>
								<Icon name='link' size='large' color={theme.colors.lightBlue} />
								<Text
									variant='p3-secondary-light'
									numberOfLines={1}
									marginLeft='s'
									style={{ color: theme.colors.lightBlue }}
								>
									links
								</Text>
							</View>
						</TouchableOpacity>
					</Touchable>
				</View>
			</View>
			{/* <Button
                icon='contract'
                onPress={() => console.log('send contract')}
                containerProps={{
                    marginBottom: 's',
                    style: { flex: 1 }
                }}
            >Send Contract</Button> */}
			<View
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
			>
				{/* <ToggleButton
                    text='follow'
                    inactiveText='following'
                    onPress={() => console.log('follow')}
                    containerProps={{
                        style: { flex: 1 },
                        marginRight: 's'
                    }}
                />
                <Button
                    onPress={() => console.log('map')}
                    containerProps={{
                        marginRight: 's',
                        style: { flex: 1 }
                    }}
                >map</Button> */}
				<View
					flexDirection='row'
					marginHorizontal='m'
					justifyContent='center'
					alignItems='center'
				>
					<Icon name='dm' size='large' color='#fff' />
				</View>
			</View>
		</View>
	);
};

export default MainButtons;
