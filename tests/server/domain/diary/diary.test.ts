import {expect} from "vitest";
import {aDiary} from "../../../fixtures";
import {GalleryTitle} from "$lib/server/domain/models/gallery/GalleryTitle";
import {Post} from "$lib/server/domain/models/gallery/Post";
import {PostId} from "$lib/server/domain/models/gallery/PostId";

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

        test("copies over diary entries to gallery posts", () => {
            const gallery = aDiary.publish()

            const expectedPosts = [
                new Post(
                    new PostId(expect.any(String)),
                    "Vacation in Andalusia",
                    "This is the content of the entry",
                    '<iframe></iframe>',
                    new URL("http://localhost:5173/ca3321fe-5e3a-48d4-9356-d98579a258d9"),
                ),
                new Post(
                    new PostId(expect.any(String)),
                    "Second",
                    "This is the content of the entry",

                    '<iframe></iframe>',
                    new URL("http://localhost:5173/ca3321fe-5e3a-48d4-9356-d98579a258d9"),
                )
            ]

            expect(gallery.posts).toStrictEqual(expectedPosts)
        })
    })
})