<script lang="ts">
    import type {PageData} from './$types';
    import Carousel from "$lib/components/Carousel.svelte";
    import {formatDateString} from "$lib/utils";
    import Navbar from "$lib/components/Navbar.svelte";
    import Link from "$lib/components/Link.svelte";

    export let data: PageData;
    const formattedDate = formatDateString(data.entry.date)
</script>

<Navbar>
    <Link href="/app/diary/{data.diaryId}">Back</Link>
    <div class="prose text-center">
        <h3>{data.entry.title}</h3>
    </div>
    <span class="text-right">
        <Link href="/app/diary/{data.diaryId}/entry/{data.entry.id}/edit">Edit</Link>
    </span>
</Navbar>
<main class="container h-max mx-auto flex flex-col gap-2">
    <Carousel imageURLs={data.entry.imageURLs}/>
    <div class="px-4">
        <section class="my-2 prose prose-lg">
            <p>{data.entry.content}</p>
        </section>
        <div>{@html data.entry.embedURL}</div>
        <p class="relative bottom-0">{formattedDate}</p>
    </div>
    <form action="?/delete" method="post">
        <button class="btn btn-error">Delete</button>
    </form>
</main>