<script lang="ts">
    import '../app.css';
    import NewEntryForm from "$lib/components/NewEntryForm.svelte";
    let dialog: HTMLDialogElement;

    const showModal = () => {
        dialog.showModal()
    }
</script>


<div class="navbar bg-base-100 border-b-2 mb-4">
    <div class="flex-1 gap-1">
        <a class="btn btn-ghost normal-case text-xl" href="/diary">My music diary</a>
        <a href="/diary">Home</a>
    </div>
    <button class="btn btn-circle btn-primary btn-md" aria-label="Add new entry" on:click={showModal}>+</button>
</div>

<dialog id="new-entry-modal" class="modal" bind:this={dialog}>
    <div class="modal-box">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-6">x</button>
        </form>
        <NewEntryForm method="post"/>
    </div>
</dialog>
<slot/>
