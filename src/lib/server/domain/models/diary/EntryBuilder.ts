import { EntryId, Entry } from '$lib/server/domain/models/diary/Entry';
import type { SpotifySong } from '$lib/server/domain/models/SpotifySong';
import { EntryTitle } from '$lib/server/domain/models/diary/EntryTitle';
import type { Image } from '$lib/server/domain/models/Image';
import { DiaryId } from '$lib/server/domain/models/diary/DiaryId';

export class EntryBuilder {
	//@ts-expect-error Cannot actually be undefined
	private _song: SpotifySong;
	//@ts-expect-error Cannot actually be undefined
	private _title: EntryTitle;
	private _content: string = '';
	private _date: Date = new Date();
	private _images: Array<Image> = [];
	private _id: EntryId = new EntryId(0);
	private _diaryId = new DiaryId('');

	public withId(id: number) {
		this._id = new EntryId(id);
		return this;
	}
	public song(spotifySong: SpotifySong): EntryBuilder {
		this._song = spotifySong;
		return this;
	}

	public content(content: string): EntryBuilder {
		this._content = content;
		return this;
	}

	title(title: string): EntryBuilder {
		this._title = new EntryTitle(title);
		return this;
	}

	date(date: Date): EntryBuilder {
		this._date = date;
		return this;
	}

	withImages(...images: Array<Image>): EntryBuilder {
		this._images = images;
		return this;
	}

	build(): Entry {
		return new Entry(
			this._id,
			this._diaryId,
			this._title,
			this._images,
			this._content,
			this._song,
			this._date
		);
	}

	withDiaryId(diaryId: string): EntryBuilder {
		this._diaryId = new DiaryId(diaryId);
		return this;
	}
}
