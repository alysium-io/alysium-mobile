import { IconNames } from '@svg';

export enum ExternalUrlDomain {
	// Music Streaming
	Spotify,
	AppleMusic,
	SoundCloud,
	Tidal,
	AmazonMusic,
	Deezer,
	Beatport,

	// Video Platforms
	YouTube,
	Vimeo,
	TikTok,

	// Social Media
	Instagram,
	Facebook,
	TwitterX,
	Threads,

	// Ticketing/Events
	Eventbrite,
	SeeTickets,
	TicketMaster,
	Resident,
	Dice,

	// Merch/Support
	Shopify,
	BigCartel,
	Bandcamp,
	Patreon,
	BuyMeACoffee,
	KoFi,

	// Unknown
	Unknown
}

export const DOMAIN_TO_ICON_MAP: Record<ExternalUrlDomain, IconNames> = {
	[ExternalUrlDomain.AppleMusic]: 'apple-music',
	[ExternalUrlDomain.Bandcamp]: 'bandcamp',
	[ExternalUrlDomain.Beatport]: 'beatport',
	[ExternalUrlDomain.BigCartel]: 'big-cartel',
	[ExternalUrlDomain.BuyMeACoffee]: 'buy-me-a-coffee',
	[ExternalUrlDomain.Deezer]: 'deezer',
	[ExternalUrlDomain.Dice]: 'dice',
	[ExternalUrlDomain.Eventbrite]: 'eventbrite',
	[ExternalUrlDomain.Facebook]: 'facebook',
	[ExternalUrlDomain.Instagram]: 'instagram',
	[ExternalUrlDomain.KoFi]: 'kofi',
	[ExternalUrlDomain.Patreon]: 'patreon',
	[ExternalUrlDomain.Shopify]: 'shopify',
	[ExternalUrlDomain.SoundCloud]: 'soundcloud',
	[ExternalUrlDomain.Threads]: 'threads',
	[ExternalUrlDomain.Tidal]: 'tidal',
	[ExternalUrlDomain.TikTok]: 'tiktok',
	[ExternalUrlDomain.Vimeo]: 'vimeo',
	[ExternalUrlDomain.TwitterX]: 'twitter-x',
	[ExternalUrlDomain.YouTube]: 'youtube',
	[ExternalUrlDomain.Spotify]: 'spotify',
	[ExternalUrlDomain.Unknown]: 'link',
	[ExternalUrlDomain.Resident]: 'link',
	[ExternalUrlDomain.SeeTickets]: 'link',
	[ExternalUrlDomain.TicketMaster]: 'link',
	[ExternalUrlDomain.AmazonMusic]: 'link'
};

const domainPatterns: Record<string, ExternalUrlDomain> = {
	// Music Streaming
	'^(open\\.)?spotify\\.com$': ExternalUrlDomain.Spotify,
	'^music\\.apple\\.com$': ExternalUrlDomain.AppleMusic,
	'^soundcloud\\.com$': ExternalUrlDomain.SoundCloud,
	'^bandcamp\\.com$': ExternalUrlDomain.Bandcamp,
	'^tidal\\.com$': ExternalUrlDomain.Tidal,
	'^music\\.amazon\\.(com|co\\.uk|de|fr|it|es|nl|co\\.jp)$':
		ExternalUrlDomain.AmazonMusic,
	'^deezer\\.com$': ExternalUrlDomain.Deezer,
	'^beatport\\.com$': ExternalUrlDomain.Beatport,

	// Video Platforms
	'^(youtube\\.com|youtu\\.be)$': ExternalUrlDomain.YouTube,
	'^vimeo\\.com$': ExternalUrlDomain.Vimeo,
	'^tiktok\\.com$': ExternalUrlDomain.TikTok,

	// Social Media
	'^instagram\\.com$': ExternalUrlDomain.Instagram,
	'^(facebook\\.com|fb\\.com)$': ExternalUrlDomain.Facebook,
	'^(x\\.com|twitter\\.com)$': ExternalUrlDomain.TwitterX,
	'^threads\\.net$': ExternalUrlDomain.Threads,

	// Ticketing/Events
	'^eventbrite\\.(com|co\\.uk)$': ExternalUrlDomain.Eventbrite,
	'^seetickets\\.(com|co\\.uk)$': ExternalUrlDomain.SeeTickets,
	'^ticketmaster\\.(com|co\\.uk)$': ExternalUrlDomain.TicketMaster,
	'^ra\\.co$': ExternalUrlDomain.Resident,
	'^dice\\.fm$': ExternalUrlDomain.Dice,

	// Merch/Support
	'^shopify\\.com$': ExternalUrlDomain.Shopify,
	'^bigcartel\\.com$': ExternalUrlDomain.BigCartel,
	'^\\w+\\.bandcamp\\.com$': ExternalUrlDomain.Bandcamp,
	'^patreon\\.com$': ExternalUrlDomain.Patreon,
	'^buymeacoffee\\.com$': ExternalUrlDomain.BuyMeACoffee,
	'^ko-fi\\.com$': ExternalUrlDomain.KoFi
};

/**
 * Extracts hostname from a URL string
 * @param url - The URL to parse
 * @returns The hostname or null if invalid
 */
function extractHostname(url: string): string | null {
	try {
		// Remove protocol
		let hostname = url.toLowerCase();
		hostname = hostname.replace(/^(https?:\/\/)?(www\.)?/i, '');

		// Remove path, query, and hash
		hostname = hostname.split('/')[0];
		hostname = hostname.split('?')[0];
		hostname = hostname.split('#')[0];

		return hostname || null;
	} catch {
		return null;
	}
}

/**
 * Detects the domain/platform from a given URL.
 * @param url - The URL to analyze
 * @returns The detected domain as an enum value
 */
export function detectUrlDomain(url: string): ExternalUrlDomain {
	try {
		const hostname = extractHostname(url);

		if (!hostname) {
			return ExternalUrlDomain.Unknown;
		}

		// Check each pattern against the hostname
		for (const [pattern, domain] of Object.entries(domainPatterns)) {
			if (new RegExp(pattern).test(hostname)) {
				return domain;
			}
		}

		return ExternalUrlDomain.Unknown;
	} catch (error) {
		return ExternalUrlDomain.Unknown;
	}
}

export function getIconFromUrl(url: string): IconNames {
	return DOMAIN_TO_ICON_MAP[detectUrlDomain(url)];
}
