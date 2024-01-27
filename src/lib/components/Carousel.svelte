<script lang="ts">
	export let imageURLs: Array<string>;

	const length = imageURLs.length;

	const calculatePreviousIndex = (current: number, total: number): number => {
		if (current === 0) {
			return total - 1;
		}

		return current - 1;
	};

	const calculateNextIndex = (current: number, total: number): number => {
		if (current === total - 1) {
			return 0;
		}

		return current + 1;
	};
</script>

<div class="carousel w-full">
	{#if imageURLs.length > 1}
		{#each imageURLs as image, i}
			<div id="slide{i}" class="carousel-item relative w-full">
				{#if i === 0}
					<img src={image} alt="entry {i}" class="w-full" loading="eager" />
				{:else}
					<img src={image} alt="entry {i}" class="w-full" loading="lazy" />
				{/if}
				<div
					class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
				>
					<a href="#slide{calculatePreviousIndex(i, length)}" class="btn btn-circle">❮</a>
					<a href="#slide{calculateNextIndex(i, length)}" class="btn btn-circle">❯</a>
				</div>
			</div>
		{/each}
	{:else}
		<img src="https://picsum.photos/400/200" alt="showing an entry" class="w-full" />
	{/if}
</div>
