<script>
  import { Route } from 'svelte-navigator';
  import AccessDenied from './AccessDenied.svelte';
  import { onMount } from 'svelte';
  import {getToken} from '../service/AuthorizationService'

  $: isAuthorized = false;
  

  export let path, component;

 
onMount(() => {
  const token = getToken();
    if(token !== null){
    isAuthorized = true;
  }
})
</script>

{#if isAuthorized === true}
  <Route {path} {component} />
{:else}
  <Route {path} component={AccessDenied} />
{/if}
