import { Icon, Text, View } from '@atomic';
import { FindAllEventCandidatesResponseDto } from '@flux/api/candidate/dto/find-all-event-candidates.dto';
import { useNavigation, useSheet } from '@hooks';
import { ContentListItemWithButton } from '@organisms';
import { CreateContractBottomSheet } from '@popups';
import { ApiIdentifier, ContentType } from '@types';
import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface CandidatesSectionProps {
	candidatesData: FindAllEventCandidatesResponseDto[];
	event_uid: ApiIdentifier;
}

const CandidatesSection: React.FC<CandidatesSectionProps> = ({
	candidatesData,
	event_uid
}) => {
	const createContractSheetApi = useSheet();
	const { artistPage } = useNavigation();

	const [artist_uid, setArtistId] = useState<ApiIdentifier | null>(null);

	const start = (artist_uid: ApiIdentifier) => {
		setArtistId(artist_uid);
		createContractSheetApi.open();
	};

	return (
		<>
			<View>
				{candidatesData.map((candidate) => (
					<ContentListItemWithButton
						key={candidate.artist_uid}
						title={candidate.artist.name}
						contentType={ContentType.artist}
						image={candidate.artist.profile_image?.url}
						onPress={() => artistPage(candidate.artist_uid)}
						Button={() => (
							<TouchableWithoutFeedback
								onPress={() => start(candidate.artist.artist_uid)}
							>
								<View
									paddingVertical='s'
									paddingHorizontal='m'
									backgroundColor='bg1'
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between',
										borderRadius: 999,
										borderWidth: 0.3,
										borderColor: 'black'
									}}
								>
									<Text paddingRight='s' variant='paragraph-small'>
										Start Contract
									</Text>
									<Icon name='arrow-right' size='small' />
								</View>
							</TouchableWithoutFeedback>
						)}
					/>
				))}
			</View>
			<CreateContractBottomSheet
				sheetApi={createContractSheetApi}
				event_uid={event_uid}
				artist_uid={artist_uid}
			/>
		</>
	);
};

export default CandidatesSection;
