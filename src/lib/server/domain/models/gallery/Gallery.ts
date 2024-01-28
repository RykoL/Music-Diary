import type { GalleryId } from "./GalleryId";
import {GalleryTitle} from "$lib/server/domain/models/gallery/GalleryTitle";
import type {Post} from "$lib/server/domain/models/gallery/Post";

export class Gallery {

    constructor(public id: GalleryId, public title: GalleryTitle, public posts: Post[]) {
    }

}