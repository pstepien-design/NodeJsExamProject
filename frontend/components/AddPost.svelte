<script>
  import { getContext } from 'svelte';
  import { addPost } from '../service/PostService.js';
  import { getUser } from '../stores/store.js';
  import { onMount } from 'svelte';

  const { close } = getContext('simple-modal');
  export let title, text, postAvailability;

  let user;
  onMount(async () => {
    user = await getUser();
  });

  const submitPost = () => {
    const postedBy = user.email;
    if(postAvailability === 'private'){
      postAvailability = true;
    } else {
      postAvailability = false;
    }
    addPost(title, text, postedBy, postAvailability, user.id);
    close();
    window.location.reload();
  };
</script>

<h1>Add post</h1>
<form on:submit|preventDefault={submitPost} class="credentials__form">
  <p class="credentials__label">Title</p>
  <input type="text" required="required" bind:value={title} />
  <p class="credentials__label">Text</p>
  <!-- <input type="text" required="required" bind:value={text} /> -->
  <textarea type="text" required="required" bind:value={text}></textarea>
  <p class="credentials__label">Post Availability</p>
  <select bind:value={postAvailability}>
    <option value="public">
      public
    </option>
    <option value="private">
      private
    </option></select>
  <div>
    <button class="modal_button" type="submit">Add post</button>
  </div>
</form>

<style>
  .modal_button {
    background-color: #ea5045;
    border-color: #ea5045;
  }

  form{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>