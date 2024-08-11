export interface ScrapedSpotifyArtistData {
	spotify_artist_id: string;
	url: string;
	followers: number;
	genres: string | null;
	spotify_image: string | null;
	name: string;
	popularity: number;
}
