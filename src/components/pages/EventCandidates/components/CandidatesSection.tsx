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
	eventId: ApiIdentifier;
}

const CandidatesSection: React.FC<CandidatesSectionProps> = ({
	candidatesData,
	eventId
}) => {
	const createContractSheetApi = useSheet();
	const { artistPage } = useNavigation();

	const [artistId, setArtistId] = useState<ApiIdentifier | null>(null);

	const start = (artistId: ApiIdentifier) => {
		setArtistId(artistId);
		createContractSheetApi.open();
	};

	return (
		<>
			<View>
				{candidatesData.map((candidate) => (
					<ContentListItemWithButton
						key={candidate.artist_id}
						title={candidate.artist.name}
						contentType={ContentType.artist}
						image={candidate.artist.profile_image?.url}
						onPress={() => artistPage(candidate.artist_id)}
						Button={() => (
							<TouchableWithoutFeedback
								onPress={() => start(candidate.artist.artist_id)}
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
				eventId={eventId}
				artistId={artistId}
			/>
		</>
	);
};

export default CandidatesSection;
