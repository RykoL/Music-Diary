<script lang="ts">
    import type {PageData} from './$types';
    import EntryCard from "$lib/components/EntryCard.svelte";

    export let data: PageData;
</script>

<section class="container flex flex-col gap-5">
    {#each data.entries as entry}
        <EntryCard entry={entry} />
    {/each}
</section>