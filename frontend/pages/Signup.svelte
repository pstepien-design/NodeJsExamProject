<script>
  import Credentials from '../components/Credentials.svelte';
  import { onMount } from 'svelte';
  import { getAccessToken } from '../stores/store';
  import { useNavigate } from 'svelte-navigator';

  const navigate = useNavigate();

  onMount(() => {
    if (getAccessToken()) {
      navigate('/posts');
    }
  });
</script>

<Credentials operation="Sign up" />
