import {expect} from "vitest";
import {aDiary} from "../../../fixtures";
import {GalleryTitle} from "$lib/server/domain/models/gallery/GalleryTitle";

describe("Diary", () => {

    describe("publish", () => {

        test("publishes a new gallery", () => {
            const diary = aDiary

            const gallery = diary.publish()

            expect(gallery).not.to.be.null
            expect(gallery).not.to.be.undefined
            expect(gallery.id).not.to.be.toBeFalsy()
        })

        test("publishes a gallery with a title", () => {
            const gallery = aDiary.publish("Vacations")

            expect(gallery.title).toStrictEqual(new GalleryTitle("Vacations"))
        })

        test("uses the diary title if no title has been provided during publishing", () => {
            const gallery = aDiary.publish()

            expect(gallery.title).toStrictEqual(new GalleryTitle(aDiary.title))
        })

        test("")
    })
})