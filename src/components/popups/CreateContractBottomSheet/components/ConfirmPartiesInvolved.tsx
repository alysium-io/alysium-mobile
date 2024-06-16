import { Avatar, Icon, Section, Text, View } from '@atomic';
import { BottomSheetHeader } from '@organisms';
import { ContentType } from '@types';
import React from 'react';

const ConfirmPartiesInvolved = () => {
	return (
		<View>
			<BottomSheetHeader text='Start Contract' />
			<Section margin='m'>
				<View marginVertical='xl' alignItems='center'>
					<Icon name='logo' size='large' color='t2' />
				</View>
				<View
					marginVertical='l'
					flexDirection='row'
					justifyContent='space-around'
				>
					<View alignItems='center'>
						<Avatar
							contentType={ContentType.host}
							size={100}
							borderRadius='round'
						/>
						<Text variant='paragraph' color='t3' marginTop='m'>
							Host
						</Text>
					</View>
					<View alignItems='center'>
						<Avatar
							contentType={ContentType.artist}
							size={100}
							borderRadius='round'
						/>
						<Text variant='paragraph' color='t3' marginTop='m'>
							Artist
						</Text>
					</View>
				</View>
				<Text variant='paragraph' color='t2' textAlign='center' marginTop='xl'>
					Please confirm that the above parties are correct.
				</Text>
			</Section>
		</View>
	);
};

export default ConfirmPartiesInvolved;
