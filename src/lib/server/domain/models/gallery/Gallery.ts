import type { GalleryId } from "./GalleryId";
import {GalleryTitle} from "$lib/server/domain/models/gallery/GalleryTitle";

export class Gallery {

    constructor(public id: GalleryId, public title: GalleryTitle) {
    }

}