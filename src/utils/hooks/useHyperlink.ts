import { UNIVERSAL_LINK_PREFIX } from '@arch/Application/config/linking';
import { NanoId } from '@types';

interface IUseHyperlink {
	eventPageHyperlink: (event_uid: NanoId) => string;
	artistPageHyperlink: (artist_uid: NanoId) => string;
}

const useHyperlink = (): IUseHyperlink => {
	const eventPageHyperlink = (event_uid: NanoId) => {
		return UNIVERSAL_LINK_PREFIX + '/event/' + event_uid;
	};

	const artistPageHyperlink = (artist_uid: NanoId) => {
		return UNIVERSAL_LINK_PREFIX + '/artist/' + artist_uid;
	};

	return {
		artistPageHyperlink,
		eventPageHyperlink
	};
};

export default useHyperlink;
