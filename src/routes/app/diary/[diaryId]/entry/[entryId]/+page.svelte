<script lang="ts">
    import type {PageData} from './$types';
    import Carousel from '$lib/components/Carousel.svelte';
    import {formatDateString} from '$lib/utils';
    import Navbar from '$lib/components/Navbar.svelte';
    import Link from '$lib/components/Link.svelte';
    import NavigationTitle from "$lib/components/NavigationTitle.svelte";

    export let data: PageData;
    const formattedDate = formatDateString(data.entry.date);
</script>

<Navbar>
    <Link href="/app/diary/{data.diaryId}">Back</Link>
    <div class="prose text-center">
        <NavigationTitle>Entry</NavigationTitle>
    </div>
    <span class="text-right">
		<Link href="/app/diary/{data.diaryId}/entry/{data.entry.id}/edit">Edit</Link>
	</span>
</Navbar>
<main class="container h-max mx-auto flex flex-col gap-2 w-96">
    <div class="prose prose-lg">
        <h3 class="contents">{data.entry.title}</h3>
        <p>{formattedDate}</p>
    </div>
    <Carousel imageURLs={data.entry.imageURLs}/>
    <section class="my-2 prose prose-lg">
        <p>{data.entry.content}</p>
    </section>
    <div>{@html data.entry.embedURL}</div>
</main>
