import {Diary} from "$lib/server/domain/models/Diary";
import {DiaryId} from "$lib/server/domain/models/DiaryId";

export class User {
    constructor() {
    }

    public static anonymous() {
        return new User()
    }

    startNewDiary(title: string, description: string | undefined) {
        return new Diary(
            new DiaryId(),
            title,
            description ?? "",
            []
        )
    }
}