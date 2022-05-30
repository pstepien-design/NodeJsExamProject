<script>
  import {Route} from 'svelte-navigator'
  import AccessDenied from './AccessDenied.svelte'
  import { onMount } from 'svelte';
  
  export let path, component;
  
  
  $: isAuthorized = false;
  
  onMount(async() => {
  })
  
  </script>
   {#if isAuthorized === true} 
  <Route {path} {component}></Route>
   {:else}
  <Route {path} component={AccessDenied}></Route>
  {/if} 