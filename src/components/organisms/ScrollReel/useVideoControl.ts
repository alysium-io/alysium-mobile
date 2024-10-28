import { useRef } from 'react';
import { VideoRef } from 'react-native-video';

type VideoController = {
	videoRef: VideoRef | null;
	paused: boolean;
	duration: number | null;
};

type VideoRefMap = {
	[key: number]: VideoController | null;
};

export interface VideoControlApi {
	register: (id: number, ref: VideoRef | null) => void;
	unregister: (id: number) => void;
	play: (id: number) => void;
	pause: (id: number) => void;
	rewind: (id: number) => void;
	togglePlay: (id: number) => void;
	seek: (id: number, time: number) => void;
	setDuration: (id: number, duration: number) => void;
	getIsPaused: (id: number) => boolean | null;
}

const useVideoControl = (): VideoControlApi => {
	const videoRefs = useRef<VideoRefMap>({});

	const getController = (id: number): VideoController | null => {
		const controller = videoRefs.current[id];
		if (!controller) {
			console.error(`Video with id ${id} not found`);
			return null;
		}
		return controller;
	};

	const getVideoRef = (id: number): VideoRef | null => {
		const videoRef = getController(id)?.videoRef;
		if (!videoRef) {
			console.error(`Video with id ${id} not found`);
			return null;
		}
		return videoRef;
	};

	const register = (id: number, ref: VideoRef | null) => {
		if (!(id in videoRefs.current)) {
			videoRefs.current[id] = {
				videoRef: ref,
				paused: true,
				duration: null
			};
		}
	};

	const unregister = (id: number) => {
		if (id in videoRefs.current) {
			delete videoRefs.current[id];
		}
	};

	const setDuration = (id: number, duration: number) => {
		const controller = getController(id);
		if (controller) {
			controller.duration = duration;
		}
	};

	const play = (id: number) => {
		const controller = getController(id);
		if (controller) {
			controller.videoRef?.resume();
			controller.paused = false;
		}
	};

	const pause = (id: number) => {
		const controller = getController(id);
		if (controller) {
			controller.videoRef?.pause();
			controller.paused = true;
		}
	};

	const togglePlay = (id: number) => {
		const controller = getController(id);
		if (controller) {
			if (controller.paused) {
				play(id);
			} else {
				pause(id);
			}
		}
	};

	const rewind = (id: number) => {
		const videoRef = getVideoRef(id);
		if (videoRef) {
			videoRef.seek(0);
		}
	};

	const seek = (id: number, percentage: number) => {
		const controller = getController(id);
		if (controller) {
			const duration = controller.duration;
			if (duration) {
				const time = duration * percentage;
				controller.videoRef?.seek(time);
			}
		}
	};

	const getIsPaused = (id: number): boolean | null => {
		const controller = getController(id);
		if (controller) {
			return controller.paused;
		}
		return null;
	};

	return {
		register,
		unregister,
		play,
		pause,
		rewind,
		togglePlay,
		seek,
		setDuration,
		getIsPaused
	};
};

export default useVideoControl;
