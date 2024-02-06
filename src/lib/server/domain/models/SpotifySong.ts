export class SpotifyURL {
	constructor(public value: string) {
		const url = new URL(value);
		if (url.hostname !== 'open.spotify.com') {
			throw new Error(`${value} is not a valid spotify url.`);
		}
	}

	public getId(): SpotifyId {
		const urlParts = new URL(this.value).pathname.split('/');
		const trackId = urlParts[urlParts.length - 1];
		return new SpotifyId(trackId);
	}
}

export class SpotifyId {
	constructor(public value: string) {}
}
export class SpotifySong {
	constructor(
		public id: SpotifyId,
		public spotifyURL: SpotifyURL,
		public html: string
	) {}

	isSameSong(id: SpotifyId): boolean {
		return this.id.value === id.value;
	}
}
