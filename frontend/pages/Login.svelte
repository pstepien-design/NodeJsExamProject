<script>
  import { onMount } from 'svelte';
  import { doesUserExist } from '../stores/store';
  import Credentials from '../components/Credentials.svelte';
  import { useNavigate } from 'svelte-navigator';

  const navigate = useNavigate();

  onMount(async () => {
    const userExists = await doesUserExist();
    if (userExists) {
      navigate('/home');
    }
  });
</script>

<Credentials operation="Login" />
