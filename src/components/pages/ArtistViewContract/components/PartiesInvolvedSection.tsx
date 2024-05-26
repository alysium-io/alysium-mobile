import { Avatar, Icon, Section, Text, View } from '@atomic';
import { FindOneContractResponseDto } from '@flux/api/contract/dto/find-one-contract.dto';
import { ContentType } from '@types';
import React from 'react';

interface PartiesInvolvedSectionProps {
	contractData: FindOneContractResponseDto;
}

const PartiesInvolvedSection: React.FC<PartiesInvolvedSectionProps> = ({
	contractData
}) => {
	return (
		<Section marginTop='xl' marginHorizontal='m'>
			<View alignItems='center'>
				<Icon name='logo' size='large' color='t2' />
			</View>
			<View
				marginVertical='xl'
				flexDirection='row'
				justifyContent='space-around'
			>
				<View alignItems='center'>
					<Avatar
						contentType={ContentType.host}
						image={contractData.host?.profile_image?.url}
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
						image={contractData.artist?.profile_image?.url}
						size={100}
						borderRadius='round'
					/>
					<Text variant='paragraph' color='t3' marginTop='m'>
						Artist
					</Text>
				</View>
			</View>
		</Section>
	);
};

export default PartiesInvolvedSection;
