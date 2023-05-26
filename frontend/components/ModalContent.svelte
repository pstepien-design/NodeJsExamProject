<script>
  import { getContext } from 'svelte';
  import AddPost from '../components/AddPost.svelte';
  import AddProfilePicture from '../components/AddProfilePicture.svelte';

  export let text;
  export let action; 

  let showModal = () => {};
  const { open } = getContext('simple-modal');

  if(action === 'ADD_POST'){
    showModal = () => open(AddPost);
  }
  else if(action === 'PROFILE_PICTURE'){
    showModal = () => open(AddProfilePicture);
  }


</script>

<p><button on:click={showModal}>{text}</button></p>

<style>
  button {
    font-size: 2rem;
    border-radius: 12px;
    width: 30%;
    height: 60px;
    font-weight: 20px;
    margin-top: 20px;
    background-color: #ea5045;
  }
</style>
