<script lang="ts">
    import type {PageData} from './$types';
    import EntryCard from "$lib/components/EntryCard.svelte";
    import NewEntryForm from "$lib/components/NewEntryForm.svelte";
    import Navbar from "$lib/components/Navbar.svelte";

    let dialog: HTMLDialogElement;

    const showModal = () => {
        dialog.showModal()
    }
    export let data: PageData;
</script>
<Navbar>
    <a class="btn btn-ghost normal-case text-xl col-start-2" href="/diaries">My music diary</a>
    <div class="flex justify-end col-start-3">
        <button class="btn btn-circle btn-primary btn-md" aria-label="Write new entry" on:click={showModal}>
            +
        </button>
    </div>
</Navbar>
<section class="container flex flex-col gap-5 mt-2">
    {#each data.entries as entry}
        <EntryCard entry={entry} diaryId="{data.id}"/>
    {/each}
</section>
<dialog id="new-entry-modal" class="modal" bind:this={dialog}>
    <div class="modal-box">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-6">x</button>
        </form>
        <NewEntryForm method="post"/>
    </div>
</dialog>