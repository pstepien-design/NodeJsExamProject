<script>
  import { onMount } from 'svelte';
  import { getToken } from '../stores/store';
  import Credentials from '../components/Credentials.svelte';
  import { useNavigate } from 'svelte-navigator';
  import { afterUpdate } from 'svelte';

  const navigate = useNavigate();
  
 

  onMount(() => {
    if (getToken()) {
      navigate('/home');
    }
  });
</script>

<Credentials operation="Login" />
