<script lang="ts">
	import type { EntryPresentation } from '$lib/models/EntryResponse';
	import { formatDateString } from '$lib/utils.js';
	import { X } from 'lucide-svelte';

	export let entry: EntryPresentation;
	export let diaryId: string;
	let formattedDate = formatDateString(entry.date);
	const previewImageURL = entry.imageURLs[0] ?? 'https://picsum.photos/400/200';
</script>

<article class="card w-96 bg-base-100 shadow-xl card-bordered card-visibility mx-auto">
	<div class="absolute top-2 right-2 z-50">
		<form action="/app/diary/{diaryId}/entry/{entry.id}?/delete" method="post" class="z-50">
			<input type="hidden" name="diaryId" value="" />
			<button class="btn btn-sm btn-ghost" aria-label="Remove ">
				<X />
			</button>
		</form>
	</div>
	<a href="/app/diary/{diaryId}/entry/{entry.id}">
		<figure class="card-container">
			<img
				loading="lazy"
				src={previewImageURL}
				class="image-full"
				alt="description of whats happening in here"
			/>
		</figure>
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
	</a>
</article>

<style>
	.card-container {
		height: 12.5rem;
	}
</style>
