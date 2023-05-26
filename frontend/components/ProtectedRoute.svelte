<script>
  import { Route, navigate } from 'svelte-navigator';
  import AccessDenied from './AccessDenied.svelte';
  import { onMount } from 'svelte';
  import { verifyToken } from '../service/AuthorizationService';
  import { getAccessToken, removeUserId, removeRefreshToken, removeAccessToken } from '../stores/store';

  export let path, component;

  $: isAuthorized = false;

  const logout = () => {
    removeUserId();
        removeAccessToken();
        removeRefreshToken();
        navigate('/');
  }


  onMount(async () => {
    const token = getAccessToken();
    if (token) {
      const response = await verifyToken(token);
      if(response && response.status === 200){
        isAuthorized = true;
      }
      else{
       logout();
      }
    }
    else{
      logout();
    }
  });
</script>

{#if isAuthorized === true}
  <Route {path} {component} />
{:else}
  <Route {path} component={AccessDenied} />
{/if}
