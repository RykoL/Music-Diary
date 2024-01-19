<script lang="ts">
    import type {DiaryPresentation} from "$lib/models/DiaryPresentation";
    import {X} from "lucide-svelte";

    export let diary: DiaryPresentation
</script>
<div class="card w-96 bg-base-100 shadow-xl image-full mx-auto">
    <figure><img src="https://picsum.photos/400/200" alt="diary"/></figure>
    <div class="w-full flex flex-row justify-end h-fit pt-2 px-2">
        <form action="?/delete" method="post" class="z-50">
            <input type="hidden" name="diaryId" value={diary.id}>
            <button class="btn btn-sm btn-ghost" aria-label="Remove {diary.title}">
                <X/>
            </button>
        </form>
    </div>
    <div class="card-body">
        <h2 class="card-title">{diary.title}</h2>
        <p>{diary.description}</p>
        <div class="card-actions justify-end">
            <a href="/app/diary/{diary.id}" class="btn btn-primary" aria-label="Open {diary.title}">Open Now</a>
        </div>
    </div>
</div>