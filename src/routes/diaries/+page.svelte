<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import type {PageData} from './$types'

    let dialog: HTMLDialogElement;
    const showModal = () => {
        dialog.showModal()
    }
    export let data: PageData;
</script>

<Navbar>
    <a class="btn btn-ghost normal-case text-xl col-start-2" href="/diary">Your diaries</a>
</Navbar>
<dialog id="new-entry-modal" class="modal" bind:this={dialog}>
    <div class="modal-box">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-6">x</button>
        </form>
        <form method="post">
            <div class="form-control">
                <label for="title" class="label">
                    <span class="label-text">Title</span>
                </label>
                <input type="text" class="input input-bordered w-full" id="title" placeholder="Your diary title"
                       name="title" required>
            </div>
            <div class="form-control">
                <label for="description" class="label">
                    <span class="label-text">
                        Description
                    </span>
                </label>
                <input type="text" class="input input-bordered w-full" id="description"
                       placeholder="Short description about this diary" name="description">
            </div>
            <div class="form-control w-full mt-6">
                <button type="submit" class="btn btn-primary w-full mx-auto">Create</button>
            </div>
        </form>
    </div>
</dialog>
<main class="container mx-auto flex flex-col w-full gap-3 mt-3">

    {#each data.diaries as diary }
        <div class="card w-96 bg-base-100 shadow-xl image-full mx-auto">
            <figure><img src="https://picsum.photos/400/200" alt="diary"/></figure>
            <div class="card-body">
                <h2 class="card-title">{diary.title}</h2>
                <p>{diary.description}</p>
                <div class="card-actions justify-end">
                    <a href="/diary/{diary.id}" class="btn btn-primary">Open Now</a>
                </div>
            </div>
        </div>
    {/each}
    <button class="btn btn-primary" on:click={showModal}>Start new diary</button>
</main>
