<script lang="ts">
    import type {PageData} from './$types'
    import EditEntryForm from "$lib/components/EditEntryForm.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import Link from "$lib/components/Link.svelte";
    import Carousel from "$lib/components/Carousel.svelte";

    export let data: PageData;
    let formId: string = 'editEntryForm';
    let formHasChanged = false;

    const onChange = () => {
        formHasChanged = true
    }
</script>

<Navbar>
    <Link href="/diary/{data.diaryId}/entry/{data.entry.id}">Back</Link>
    <div class="prose text-center">
        <h3>Edit</h3>
    </div>
    {#if formHasChanged}
        <button type="submit" class="link link-primary link-hover col-start-3 text-right" form={formId}
                disabled={!formHasChanged}>Save
        </button>
    {:else }
        <button type="submit" class="link link-neutral link-hover col-start-3 text-right" form={formId}
                disabled={!formHasChanged}>Save
        </button>
    {/if}
</Navbar>
<main class="flex flex-col py-2">
    <Carousel imageURLs={data.entry.imageURLs}/>
    <section class="px-4">
        <EditEntryForm entry={data.entry} formId={formId} hasChanged={onChange}/>
    </section>
</main>
