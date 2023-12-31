<script lang="ts">
    import {browser} from "$app/environment";
    import type {EntryPresentation} from "$lib/models/EntryResponse";
    import {formatDateString} from "$lib/utils.js";

    export let entry: EntryPresentation;
    let formattedDate = formatDateString(entry.date)
</script>

<style>
    .card-container {
        height: 12.5rem;
    }
</style>

<a href="diary/entry/{entry.id}" class="w-fit mx-auto">
    <article class="card w-96 bg-base-100 shadow-xl card-bordered card-visibility">
        <figure class="card-container"><img loading="lazy" src={entry.imageURL}
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