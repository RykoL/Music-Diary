<script>
import Navbar from "$lib/components/Navbar.svelte";
</script>

<Navbar>
    <a class="btn btn-ghost normal-case text-xl col-start-2" href="/diary">Your diaries</a>
    <div class="flex justify-end col-start-3">
        <button class="btn btn-circle btn-primary btn-md" aria-label="Add new entry" on:click={showModal}>
            +
        </button>
    </div>
</Navbar>
<main class="container mx-auto flex w-full">
    <div class="card w-96 bg-base-100 shadow-xl image-full mx-auto">
        <figure><img src="https://picsum.photos/400/200" alt="diary" /></figure>
        <div class="card-body">
            <h2 class="card-title">My music diary</h2>
            <p>This is your first diary</p>
            <div class="card-actions justify-end">
                <a href="/diary/c2383d72-53f4-4a8b-b09f-fa416d4fcb8e" class="btn btn-primary">Open Now</a>
            </div>
        </div>
    </div>
</main>
