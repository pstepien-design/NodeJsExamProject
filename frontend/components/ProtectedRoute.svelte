<script>
  import { Route } from 'svelte-navigator';
  import AccessDenied from './AccessDenied.svelte';
  import { onMount } from 'svelte';
  import { getUser } from '../stores/store';

  export let path, component;

  $: isAuthorized = false;

  onMount(async () => {
    const user = await getUser();
    if (user !== null) {
      isAuthorized = true;
    }
  });
</script>

{#if isAuthorized === true}
  <Route {path} {component} />
{:else}
  <Route {path} component={AccessDenied} />
{/if}
