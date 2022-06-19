<script>
  import { onMount } from 'svelte';
  import { getUser } from '../stores/store';
  onMount(async () => {
   const user = await getUser()
    console.log(user)
  });
</script>

<div class="profile_container">
  <div>First Name</div>
  <div></div>
  <div>Last Name</div>
</div>

<style>
  .profile_container {
    height: 100%;
    overflow: auto;
    }
</style>