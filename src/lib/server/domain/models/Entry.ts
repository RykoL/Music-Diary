import type {Song} from "$lib/server/domain/models/Song";
import {EntryBuilder} from "$lib/server/domain/models/EntryBuilder";
import type {EntryTitle} from "$lib/server/domain/models/EntryTitle";
import {AttachedImage, type Image, UnattachedImage} from "$lib/server/domain/models/Image";

export class EntryId {
    constructor(public value: number) {
    }
}


export class Entry {

    id: EntryId
    title: EntryTitle
    private images: Array<Image>
    song: Song
    content: string
    date: Date

    constructor(id: EntryId, title: EntryTitle, images: Array<Image>, content: string, song: Song, date: Date) {
        this.id = id
        this.title = title
        this.images = images
        this.song = song
        this.content = content
        this.date = date;
    }

    public static builder(): EntryBuilder {
        return new EntryBuilder()
    }

    public attachNewImage(img: UnattachedImage) {
        this.images.push(img)
    }

    public getUnAttachedImages(): Array<UnattachedImage> {
        return this.images.filter(img => img instanceof UnattachedImage)
    }

    public getAttachedImages(): Array<AttachedImage> {
        return this.images.filter(img => img instanceof AttachedImage) as Array<AttachedImage>
    }
}