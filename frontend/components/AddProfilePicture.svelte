<script>
  import { getContext } from 'svelte';
  import { getAccessToken, getUser } from '../stores/store.js';
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

  const submitImage = async () => {
    const token = getAccessToken();
    const response = await fetch('http://localhost:3000/users/upload-pb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      enctype: "multipart/form-data"
    });
    if (!response.ok) {
     throw new Error('Something went wrong');
    } else {
      close();
    window.location.reload();
    }
  };

</script>

<h1>Add profile picture !</h1>
<form on:submit|preventDefault={submitImage} class="form">
  <div class="container">
    <input name="profilePicture" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
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