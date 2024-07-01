import { View } from '@atomic';
import { Portal } from '@gorhom/portal';
import { useLayoutDimensions } from '@hooks';
import React from 'react';
import { Case, If, Switch, Then } from 'react-if';
import { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Backdrop from './components/Backdrop';
import BottomButton from './components/BottomButton';
import CompleteModal from './components/CompleteModal';
import Loader from './components/Loader';
import Sheet from './components/Sheet';
import SwipeUpToSubmitText from './components/SwipeUpToSubmitText';
import useSwipeUpToSubmit from './useSwipeUpToSubmit';

interface SwipeUpToSubmitProps {
	isOpen: boolean;
	dismiss: () => void;
	CompleteModalContent?: () => React.JSX.Element;
	SheetContent?: () => React.JSX.Element;
}

const SwipeUpToSubmit: React.FC<SwipeUpToSubmitProps> = ({
	isOpen,
	dismiss,
	CompleteModalContent,
	SheetContent
}) => {
	const insets = useSafeAreaInsets();
	const { dimensions, onLayout } = useLayoutDimensions();
	const {
		stage,
		onCommit,
		onCommitSuccess,
		resetAll,
		swipeUpToSubmitTextContainerStyles,
		onDragUpdate,
		onCancelCommit
	} = useSwipeUpToSubmit();

	const _dismiss = () => {
		setTimeout(resetAll, 300);
		dismiss();
	};

	return (
		<Portal>
			<If condition={isOpen}>
				<Then>
					<Backdrop>
						<Switch>
							<Case condition={stage === 'start'}>
								<View flex={1}>
									<View flex={1} />
									<View
										onLayout={onLayout}
										animated
										style={swipeUpToSubmitTextContainerStyles}
									>
										<View style={{ marginBottom: insets.bottom }}>
											<SwipeUpToSubmitText />
											<BottomButton onPress={_dismiss} />
										</View>
									</View>
								</View>
							</Case>
							<Case condition={stage === 'submitted'}>
								<View
									flex={1}
									justifyContent='center'
									alignItems='center'
									animated
									entering={FadeIn.duration(300).delay(300)}
									onLayout={() => setTimeout(onCommitSuccess, 2000)}
								>
									<Loader />
								</View>
							</Case>
							<Case condition={stage === 'submitSuccess'}>
								<CompleteModal
									dismiss={_dismiss}
									CompleteModalContent={CompleteModalContent}
								/>
							</Case>
						</Switch>
						<Sheet
							bottomContentHeight={dimensions?.height || 0}
							didCommit={onCommit}
							SheetContent={SheetContent}
							onDragUpdate={onDragUpdate}
							onCancelCommit={onCancelCommit}
						/>
					</Backdrop>
				</Then>
			</If>
		</Portal>
	);
};

export default SwipeUpToSubmit;
