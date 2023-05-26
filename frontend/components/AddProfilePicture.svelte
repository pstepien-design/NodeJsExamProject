<script>
  import { getContext } from 'svelte';
  import { getUser } from '../stores/store.js';
  import { onMount } from 'svelte';

  const { close } = getContext('simple-modal');

  let fileinput;
	
	const onFileSelected = (e) => {
  let image = e.target.files[0];
  console.log('image', image);
  };


  onMount(async () => {
    user = await getUser();
  });

  const submitImage = () => {

    close();
    window.location.reload();
  };

</script>

<h1>Add profile picture !</h1>
<form on:submit|preventDefault={submitImage} class="form">
  <div class="container">
    <input type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
    <button class="modal_button" type="submit">Add profile picture</button>
  </div>
</form>

<style>
  .container{
    display: flex;
    flex-direction: column;
  }
  
  .modal_button {
    background-color: #ea5045;
    border-color: #ea5045;
  }
</style>