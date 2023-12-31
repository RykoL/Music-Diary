<script lang="ts">
    import type {PageData} from './$types'
    import EditEntryForm from "$lib/components/EditEntryForm.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import Link from "$lib/components/Link.svelte";

    export let data: PageData;
    let formId: string = 'editEntryForm';
    let formHasChanged = false;

    const onChange = () => {
        formHasChanged = true
    }
</script>

<Navbar>
    <Link href="/diary/entry/{data.entry.id}">Back</Link>
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
<main class="px-2 py-2">
    <EditEntryForm entry={data.entry} formId={formId} hasChanged={onChange}/>
</main>
