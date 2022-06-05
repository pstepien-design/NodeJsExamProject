<script>
  import { navigate } from 'svelte-navigator';
  import { onMount } from 'svelte';
  import {
    doesUserExist,
    removeToken,
    removeRefreshToken,
    removeUserId,
  } from '../stores/store';

  $: isAuthorized = '';

  onMount(async () => {
    isAuthorized = await doesUserExist();
    if (isAuthorized === false) {
      removeToken();
      removeRefreshToken();
      removeUserId();
    }
  });

  function goToMain() {
    navigate('/');
  }
</script>

<div>
  {#if isAuthorized === false}
    <h1>ACCESS DENIED</h1>
    <h2>Error, log in first</h2>
    <button on:click={goToMain}>Go to the main page</button>
  {:else}
    <h1>LOADING</h1>
  {/if}
</div>

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
