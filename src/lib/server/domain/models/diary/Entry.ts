import type { Song } from '$lib/server/domain/models/Song';
import { EntryBuilder } from '$lib/server/domain/models/diary/EntryBuilder';
import type { EntryTitle } from '$lib/server/domain/models/diary/EntryTitle';
import {
	AttachedImage,
	type Image,
	ImageId,
	UnattachedImage
} from '$lib/server/domain/models/Image';
import { ValueObject } from '$lib/server/domain/models/ValueObject';
import type { DiaryId } from '$lib/server/domain/models/diary/DiaryId';
import { SpotifyId, SpotifySong, SpotifyURL } from '$lib/server/domain/models/SpotifySong';

export class EntryId extends ValueObject<number> {
	constructor(public value: number) {
		super(value);
	}

	public equals(id: EntryId): boolean {
		return this.value === id.value;
	}
}

export class Entry {
	id: EntryId;
	title: EntryTitle;
	private images: Array<Image>;
	song: Song;
	content: string;
	date: Date;
	diaryId: DiaryId;

	constructor(
		id: EntryId,
		diaryId: DiaryId,
		title: EntryTitle,
		images: Array<Image>,
		content: string,
		song: Song,
		date: Date
	) {
		this.id = id;
		this.title = title;
		this.images = images;
		this.song = song;
		this.content = content;
		this.date = date;
		this.diaryId = diaryId;
	}

	public static builder(): EntryBuilder {
		return new EntryBuilder();
	}

	public linkSong(url: SpotifyURL) {
		const id = url.getId();
		this.song = new SpotifySong(id, url, '');
	}

	public rewrite(title: EntryTitle, content: string, date: Date) {
		this.title = title;
		this.content = content;
		this.date = date;
	}

	public hasSong(songId: SpotifyId): boolean {
		return this.song.isSameSong(songId);
	}
	public attachImages(...images: File[]) {
		images.forEach(this.attachNewImage);
	}
	public attachNewImage(img: File) {
		const imageId = new ImageId();
		const unattachedImage = new UnattachedImage(imageId, img);

		this.images.push(unattachedImage);

		return unattachedImage;
	}

	public getUnAttachedImages(): Array<UnattachedImage> {
		return this.images.filter((img) => img instanceof UnattachedImage) as Array<UnattachedImage>;
	}

	public getAttachedImages(): Array<AttachedImage> {
		return this.images.filter((img) => img instanceof AttachedImage) as Array<AttachedImage>;
	}
}
