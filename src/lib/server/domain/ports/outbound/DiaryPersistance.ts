import type {Diary} from "../../models/Diary";
import type {DiaryId} from "../../models/DiaryId";
import {UserId} from "$lib/server/domain/models/UserId";

export interface DiaryPersistence {
    getDiaryById(diaryId: DiaryId): Promise<Diary | undefined>

    getDiaries(id: UserId): Promise<Array<Diary>>

    saveDiary(diary: Diary): Promise<void>

    removeDiary(diaryId: DiaryId): Promise<void>
}