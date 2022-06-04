<script>
  import Credentials from '../components/Credentials.svelte';
  import { onMount } from 'svelte';
  import { getToken } from '../stores/store';
  import { useNavigate } from 'svelte-navigator';
  import { afterUpdate } from 'svelte';

  const navigate = useNavigate();

  onMount(() => {
    if (getToken()) {
      navigate('/home');
    }
  });
</script>

<Credentials operation="Sign up" />
