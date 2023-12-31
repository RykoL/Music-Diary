<script lang="ts">
    import type {PageData} from './$types';
    import Carousel from "$lib/components/Carousel.svelte";
    import {formatDateString} from "$lib/utils";
    import Navbar from "$lib/components/Navbar.svelte";
    import Link from "$lib/components/Link.svelte";

    export let data: PageData;
    const imageURLs = [
        "https://picsum.photos/id/11/400/200",
        "https://picsum.photos/id/12/400/200",
        "https://picsum.photos/id/13/400/200",
    ]
    const formattedDate = formatDateString(data.entry.date)
</script>

<Navbar>
    <Link href="/diary">Back</Link>
    <div class="prose text-center">
        <h3>{data.entry.title}</h3>
    </div>
    <span class="text-right">
        <Link href="/diary/entry/{data.entry.id}/edit">Edit</Link>
    </span>
</Navbar>
<main class="container mx-auto flex flex-col gap-2">
    <Carousel imageURLs={imageURLs}/>
    <div class="px-4">
        <p>{formattedDate}</p>
        <section class="my-2">
            <p>{data.entry.content}</p>
        </section>
        <div>{@html data.entry.embedURL}</div>
    </div>
</main>