<script>
  import Credentials from '../components/Credentials.svelte';
  import { onMount } from 'svelte';
  import { getToken } from '../stores/store';
  import { useNavigate } from 'svelte-navigator';

  const navigate = useNavigate();

  onMount(() => {
    if (getToken()) {
      navigate('/posts');
    }
  });
</script>

<Credentials operation="Sign up" />
