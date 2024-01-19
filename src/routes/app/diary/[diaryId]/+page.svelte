<script lang="ts">
    import type {PageData} from './$types';
    import EntryCard from "$lib/components/EntryCard.svelte";
    import NewEntryForm from "$lib/components/NewEntryForm.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import Link from "$lib/components/Link.svelte";
    import {ChevronLeft, SquarePen} from "lucide-svelte";

    let dialog: HTMLDialogElement;

    const showModal = () => {
        dialog.showModal()
    }
    export let data: PageData;
</script>
<Navbar>
    <Link href="/app/diaries">Back</Link>
    <a class="btn btn-ghost normal-case text-xl col-start-2" href="/app/diaries">My music diary</a>
    <div class="flex justify-end col-start-3">
        <button class="btn btn-circle btn-primary btn-md" aria-label="Write new entry" on:click={showModal}>
            <SquarePen/>
        </button>
    </div>
</Navbar>
<section class="container flex flex-col gap-5 mt-2">
    {#if data.entries.length === 0}
        <div class="prose mx-auto px-10">
            <p>It looks pretty empty in here. How about you create a new entry.</p>
        </div>
    {/if}
    {#each data.entries as entry}
        <EntryCard entry={entry} diaryId="{data.id}"/>
    {/each}
</section>
<dialog id="new-entry-modal" class="modal" bind:this={dialog}>
    <div class="modal-box">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-6">x</button>
        </form>
        <NewEntryForm/>
    </div>
</dialog>