<script>
  import { onMount } from 'svelte';
  import { login, signup } from '../service/AuthorizationService';
  import { useNavigate } from 'svelte-navigator';
  import { getToken, saveToken } from '../stores/store';
  const navigate = useNavigate();

  let email = '';
  let password = '';

  let token;

  export let operation = '';

  const handleUserRequest = async () => {
    // console.log(email, password);
    if (operation === 'Login') {
      const response = await login(email, password);
      navigate('/home');
    } else if (operation === 'Sign up') {
      await signup(email, password);
      navigate('/home');
    } else {
      console.log('something went wrong');
    }
  };
</script>

<div>
  <p class="credentials__header">{operation}</p>
  <p class="credentials__text">{operation} by typing your email and password</p>
  <form on:submit|preventDefault={handleUserRequest} class="credentials__form">
    <p class="credentials__label">E-mail</p>
    <input type="email" required="required" bind:value={email} />
    <p class="credenstials__label">Password</p>
    <input type="password" required="required" bind:value={password} />
    <div>
      <button type="submit"> {operation} </button>
    </div>
  </form>
</div>

<style>
  .credentials__header {
    font-size: 30px;
    font-weight: bold;
  }
  .credentials__text {
    font-size: 24px;
  }
  input {
    width: 30%;
    height: 50px;
  }

  button {
    font-size: 2rem;
    border-radius: 12px;
    width: 30%;
    height: 60px;
    font-weight: 20px;
    margin-top: 20px;
    background-color: #ea5045;
  }
</style>
