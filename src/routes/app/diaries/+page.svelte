<script lang="ts">
    import Navbar from '$lib/components/Navbar.svelte';
    import type {PageData} from './$types';
    import DiaryCard from '$lib/components/DiaryCard.svelte';
    import {Plus} from 'lucide-svelte';
    import NavigationTitle from "$lib/components/NavigationTitle.svelte";

    let dialog: HTMLDialogElement;
    const showModal = () => {
        dialog.showModal();
    };
    export let data: PageData;
</script>

<Navbar>
    <a class="btn btn-ghost normal-case text-xl col-start-2" href="/app/diaries">
        <NavigationTitle>
            Your diaries
        </NavigationTitle>
    </a>
    <div class="flex justify-end py-2">
        <button
                class="btn btn-primary btn-circle btn-md"
                aria-label="Start new diary"
                on:click={showModal}
        >
            <Plus/>
        </button>
    </div>
</Navbar>
<dialog id="new-entry-modal" class="modal" bind:this={dialog}>
    <div class="modal-box">
        <h3 class="font-bold text-lg">Start new diary</h3>
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-6">x</button>
        </form>
        <form method="post" action="?/startDiary">
            <div class="form-control">
                <label for="title" class="label">
                    <span class="label-text">Title</span>
                </label>
                <input
                        type="text"
                        class="input input-bordered w-full"
                        id="title"
                        placeholder="Your diary title"
                        name="title"
                        required
                />
            </div>
            <div class="form-control">
                <label for="description" class="label">
                    <span class="label-text"> Description </span>
                </label>
                <input
                        type="text"
                        class="input input-bordered w-full"
                        id="description"
                        placeholder="Short description about this diary"
                        name="description"
                />
            </div>
            <div class="form-control w-full mt-6">
                <button type="submit" class="btn btn-primary w-full mx-auto">Create</button>
            </div>
        </form>
    </div>
</dialog>
<main class="container mx-auto flex flex-col gap-3 mt-3">
    {#if data.diaries.length === 0}
        <div class="prose">
            <p>Looks pretty empty here. How about starting your first diary</p>
        </div>
    {/if}

    {#each data.diaries as diary}
        <DiaryCard {diary}/>
    {/each}
</main>
