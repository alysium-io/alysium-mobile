import { AView, Icon } from '@atomic';
import { GeocodeResponseDto } from '@flux/api/location/types';
import { useCityAndCountryFromAddressComponents } from '@hooks';
import { Header, HeaderSection, HeaderTitle } from '@organisms';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';

interface HomePageHeaderProps {
	onPressCity: () => void;
	currentCity: GeocodeResponseDto | null;
}

const HomePageHeader: React.FC<HomePageHeaderProps> = ({
	onPressCity,
	currentCity
}) => {
	const { display } = useCityAndCountryFromAddressComponents(
		currentCity?.cityResult.address_components
	);

	return (
		<Header position='absolute' top={0} left={0} right={0} zIndex={9999}>
			<HeaderSection
				LeftComponent={
					<TouchableOpacity onPress={onPressCity}>
						<AView
							key={display.title}
							entering={FadeIn.duration(500)}
							exiting={FadeOut.duration(500)}
							flexDirection='row'
							alignItems='center'
							gap='m'
						>
							<Icon name='location' size='m' />
							<HeaderTitle
								title={display.title}
								subtitle={display.subtitle}
								titleProps={{
									variant: 'paragraph-large-medium',
									adjustsFontSizeToFit: true,
									numberOfLines: 1
								}}
								subtitleProps={{
									variant: 'paragraph-small',
									adjustsFontSizeToFit: true,
									numberOfLines: 1
								}}
							/>
						</AView>
					</TouchableOpacity>
				}
				CenterComponent={null}
				RightComponent={null}
			/>
		</Header>
	);
};

export default HomePageHeader;
