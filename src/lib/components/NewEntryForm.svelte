<script lang="ts">
    type Method = "post" | "dialog";
    export let method: Method;
</script>

<div class="prose">
    <h2>New entry</h2>
</div>
<form method={method} action="/diary" enctype="multipart/form-data">
    <div class="form-control w-full max-w-xs">
        <label for="title" class="label">
            <span class="label-text">Title</span>
        </label>
        <input type="text" id="title" name="title" class="input input-bordered w-full max-w-xs" placeholder="Title"
               required>
    </div>
    <div class="form-control w-full max-w-xs">
        <label for="song" class="label">
            <span class="label-text">Song</span>
        </label>
        <input type="url" id="song" name="song" class="input input-bordered w-full max-w-xs"
               placeholder="https://open.spotify.com/track/6Gi4xccZRKja1w78ZoBs5c?si=b284ff0046c3440" required>
    </div>
    <div class="form-control w-full max-w-xs">
        <label for="content" class="label">
            <span class="label-text">Content</span>
        </label>
        <textarea id="content" name="content" class="textarea textarea-bordered h-24"
                  placeholder="Any text you wanna share additionally"></textarea>
    </div>
    <div class="form-control w-full max-w-xs">
        <label for="date" class="label">
            <span class="label-text">Date</span>
        </label>
        <input type="date" class="w-full max-w-xs input input-bordered" id="date" name="date" required/>
    </div>
    <div class="form-control w-full max-w-xs">
        <label class="label" for="image">
            <span class="label-text">Image</span>
        </label>
        <input type="file" class="file-input file-input-bordered file-input-md w-full max-w-xs" id="images" name="images" multiple/>
    </div>

    <div class="form-control w-full max-w-xs mt-6">
        <button type="submit" class="btn btn-primary w-10/12 mx-auto">Create</button>
    </div>
</form>
