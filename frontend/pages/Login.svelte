<script>
  import { onMount } from 'svelte';
  import { getUser } from '../stores/store';
  import Credentials from '../components/Credentials.svelte';
  import { useNavigate } from 'svelte-navigator';

  const navigate = useNavigate();

  onMount(async () => {
    const userExists = await getUser();
    if (userExists) {
      navigate('/home');
    }
  });
</script>

<Credentials operation="Login" />
