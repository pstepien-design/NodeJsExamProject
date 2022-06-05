<script>
  import { Route } from 'svelte-navigator';
  import AccessDenied from './AccessDenied.svelte';
  import { onMount } from 'svelte';
  import { doesUserExist } from '../stores/store';
  import { getUser } from '../service/AuthorizationService';

  export let path, component;

  $: isAuthorized = false;

  onMount(async () => {
    isAuthorized = await doesUserExist();
  });
</script>

{#if isAuthorized === true}
  <Route {path} {component} />
{:else}
  <Route {path} component={AccessDenied} />
{/if}
