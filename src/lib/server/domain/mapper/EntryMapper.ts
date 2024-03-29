import type { Entry } from '$lib/server/domain/models/diary/Entry';
import type { EntryListResponse, EntryPresentation } from '$lib/models/EntryResponse';
import type { AttachedImage } from '$lib/server/domain/models/Image';

export const entryToPresentation = (entry: Entry): EntryPresentation => {
	return {
		id: entry.id.value,
		title: entry.title.value,
		content: entry.content,
		imageURLs: entry.getAttachedImages().map((it: AttachedImage) => it.publicURL.toString()),
		songURL: entry.song.spotifyURL.value,
		embedURL: entry.song.html,
		date: entry.date.toISOString().substring(0, 10)
	};
};
export const mapToEntryListResponse = (entries: Array<Entry>): EntryListResponse =>
	entries.map(entryToPresentation);
