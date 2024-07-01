import { HeaderSafeArea, ScrollView, View } from '@atomic';
import { Button } from '@molecules';
import { BasePage, SwipeUpToSubmit } from '@organisms';
import React, { useCallback, useState } from 'react';
import CreateProfileActionFooter from './components/CreateProfileActionFooter';
import HeaderSection from './components/HeaderSection';
import LogoutSection from './components/LogoutSection';
import MenuSection from './components/MenuSection';
import SelectAccountSection from './components/SelectAccountSection';
import useProfilePage from './useProfilePage';

const ProfilePage = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { createArtistSheetApi, createHostSheetApi } = useProfilePage();

	const FooterComponent = useCallback(
		() => (
			<CreateProfileActionFooter
				createArtistSheetApi={createArtistSheetApi}
				createHostSheetApi={createHostSheetApi}
			/>
		),
		[]
	);

	return (
		<BasePage FooterComponent={FooterComponent}>
			<HeaderSafeArea>
				<ScrollView alwaysBounceVertical>
					<HeaderSection />
					<View margin='m'>
						<Button
							text='Press me'
							onPress={() => setIsOpen(!isOpen)}
							variant='outlined'
						/>
						<SwipeUpToSubmit isOpen={isOpen} dismiss={() => setIsOpen(false)} />
					</View>
					<SelectAccountSection />
					<MenuSection />
					<LogoutSection />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default ProfilePage;
