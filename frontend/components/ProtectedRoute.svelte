<script>
  import { Route } from 'svelte-navigator';
  import AccessDenied from './AccessDenied.svelte';
  import { onMount } from 'svelte';
  import { getToken, accessToken } from '../stores/store';

  let isAuthorized = false;

  export let path, component;
  let token;
  accessToken.subscribe((value) => {
    token = value;
  });
  onMount(() => {
    if (getToken()) {
      isAuthorized = true;
    }
  });
</script>

{#if isAuthorized === true}
  <Route {path} {component} />
{:else}
  <Route {path} component={AccessDenied} />
{/if}
