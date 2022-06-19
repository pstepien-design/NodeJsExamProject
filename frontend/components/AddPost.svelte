<script>
  import { getContext } from "svelte";
  import { addPost } from "../service/PostService.js";

  const { close } = getContext("simple-modal");
  export let title, text;

  const submitPost = () => {
    addPost(title, text);
    close();
    window.location.reload();
  };
</script>

<h1>Add post !</h1>
<form on:submit|preventDefault={submitPost} class="credentials__form">
  <p class="credentials__label">Title</p>
  <input type="text" required="required" bind:value={title} />
  <p class="credentials__label">Text</p>
  <input type="text" required="required" bind:value={text} />
  <div>
    <button type="submit">Add post</button>
  </div>
</form>
