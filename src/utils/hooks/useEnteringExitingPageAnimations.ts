import { useMemo } from 'react';
import {
	ComplexAnimationBuilder,
	FadeIn,
	FadeOut
} from 'react-native-reanimated';
import useIsLoaded from './useIsLoaded';

interface IUseEnteringExitingPageAnimations {
	/**
	 * The amount of time it takes to fade in or out.
	 * Miliseconds.
	 * @default 500
	 */
	duration?: number;
	/**
	 * The amount of time to wait between page changes.
	 * Miliseconds.
	 * @default 1000
	 */
	delay?: number;
}

interface IUseEnteringExitingPageAnimationsReturn
	extends ReturnType<typeof useIsLoaded> {
	entering?: ComplexAnimationBuilder;
	exiting: ComplexAnimationBuilder;
}

const useEnteringExitingPageAnimations = (
	userConfig?: IUseEnteringExitingPageAnimations
): IUseEnteringExitingPageAnimationsReturn => {
	const config = {
		duration: 500,
		delay: 1000,
		...userConfig
	};

	const { onLoad, isLoaded } = useIsLoaded();

	const { entering, exiting } = useMemo(() => {
		let entering = undefined;
		let exiting = FadeOut.duration(config.duration);

		if (isLoaded) {
			entering = FadeIn.duration(config.duration).delay(config.delay);
		}
		return { entering, exiting };
	}, [isLoaded]);

	return { entering, exiting, onLoad, isLoaded };
};

export default useEnteringExitingPageAnimations;
