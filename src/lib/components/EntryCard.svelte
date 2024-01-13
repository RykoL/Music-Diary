<script lang="ts">
    import type {EntryPresentation} from "$lib/models/EntryResponse";
    import {formatDateString} from "$lib/utils.js";

    export let entry: EntryPresentation;
    export let diaryId: string;
    let formattedDate = formatDateString(entry.date)
    const previewImageURL = entry.imageURLs[0] ?? "https://picsum.photos/400/200"
</script>

<style>
    .card-container {
        height: 12.5rem;
    }
</style>

<a href="/app/diary/{diaryId}/entry/{entry.id}" class="w-fit mx-auto">
    <article class="card w-96 bg-base-100 shadow-xl card-bordered card-visibility">
        <figure class="card-container"><img loading="lazy" src={previewImageURL} class="image-full"
                                            alt="description of whats happening in here"/></figure>
        <div class="card-body">
            <div class="flex flex-row justify-between">
                <h2 class="card-title">{entry.title}</h2>
                <p class="flex-grow-0 leading-7">{formattedDate}</p>
            </div>
            <p>{entry.content}</p>
            <div>
                {@html entry.embedURL}
            </div>
        </div>
    </article>
</a>