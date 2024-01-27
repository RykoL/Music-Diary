import { UserId } from "$lib/server/domain/models/UserId";
import {Diary} from "$lib/server/domain/models/diary/Diary";
import {DiaryId} from "$lib/server/domain/models/diary/DiaryId";
import {expect} from "vitest";

describe("Diary", () => {

    test("should publish a new gallery", () => {
        const diary = new Diary(
            new DiaryId("a"),
            "",
            "",
            [],
            new UserId("foo")
        )

        const gallery = diary.publish()

        expect(gallery).not.to.be.null
        expect(gallery).not.to.be.undefined
        expect(gallery.id).not.to.be.toBeFalsy()
    })
})