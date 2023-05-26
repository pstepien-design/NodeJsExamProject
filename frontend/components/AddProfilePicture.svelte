<script>
  import { getContext } from 'svelte';
  import { getAccessToken } from '../stores/store.js';

  const { close } = getContext('simple-modal');

  let image;
	
	const onFileSelected = (e) => {
  image = e.target.files[0];
  };


  const submitImage = async () => {
    const imageToUpload = new FormData();
    imageToUpload.append('profilePicture', image);

    const token = getAccessToken();
    const response = await fetch('http://localhost:3000/users/upload-pb', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: imageToUpload,
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
    <input name="profilePicture" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)}>
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