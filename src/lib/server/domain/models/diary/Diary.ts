import { Entry, type EntryId } from '$lib/server/domain/models/diary/Entry';
import type { DiaryId } from '$lib/server/domain/models/diary/DiaryId';
import type { EntryDraft } from '$lib/server/domain/inbound/EntryDraft';
import type { UserId } from '$lib/server/domain/models/UserId';
import {Gallery} from "$lib/server/domain/models/gallery/Gallery";
import {GalleryId} from "$lib/server/domain/models/gallery/GalleryId";

export class Diary {
	public id: DiaryId;
	public title: string;
	public description: string;
	public owner: UserId;
	private _entries: Array<Entry> = [];

	constructor(
		id: DiaryId,
		title: string,
		description: string,
		entries: Array<Entry>,
		owner: UserId
	) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.owner = owner;
		this._entries = entries;
	}

	public writeEntry(draft: EntryDraft): Entry {
		const entry = Entry.builder()
			.withDiaryId(this.id.value)
			.title(draft.title)
			.content(draft.content)
			.date(draft.date)
			.build();

		entry.attachImages(...draft.images);
		entry.linkSong(draft.song);

		this._entries.push(entry);

		return entry;
	}

	public getEntry(id: EntryId): Entry | undefined {
		return this._entries.find((e) => e.id.equals(id));
	}

	get entries() {
		return this._entries;
	}

	public publish(): Gallery {
		return new Gallery(
			GalleryId.create()
		)
	}
}
