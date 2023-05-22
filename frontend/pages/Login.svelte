<script>
  import { onMount } from 'svelte';
  import { getAccessToken, getUser } from '../stores/store';
  import Credentials from '../components/Credentials.svelte';
  import { useNavigate } from 'svelte-navigator';

  const navigate = useNavigate();

  onMount(async () => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      navigate('/posts');
    }
  });
</script>

<Credentials operation="Login" />
