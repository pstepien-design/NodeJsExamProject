<script>
  import { login, signup } from '../service/AuthorizationService';
  import { useNavigate } from 'svelte-navigator';
  import { getNotificationsContext } from 'svelte-notifications';

  const { addNotification } = getNotificationsContext();
  const navigate = useNavigate();

  let email,
    password,
    firstName,
    lastName = '';

  let token;

  const displayNotification = () => {
    addNotification({
      text: 'Wrong credentials! Please try again',
      position: 'top-center',
      type: 'danger',
      removeAfter: 3000,
    });
  };

  export let operation = '';

  const handleUserRequest = async () => {
    if (operation === 'Login') {
      const response = await login(email, password);
      if (response) {
        navigate('/posts');
        window.location.reload();
      } else {
        displayNotification();
      }
    } else if (operation === 'Sign up') {
      await signup(email, password, firstName, lastName);
      navigate('/posts');
      window.location.reload();
    } else {
      return "error";
    }
  };
</script>

<div>
  <p class="credentials__header">{operation}</p>
  <p class="credentials__text">{operation} by typing your email and password</p>
  <form on:submit|preventDefault={handleUserRequest} class="credentials__form">
    {#if operation === 'Sign up'}
      <p class="credentials__label">First name</p>
      <input type="text" required="required" bind:value={firstName} />
      <p class="credentials__label">Last name</p>
      <input type="text" required="required" bind:value={lastName} />
    {/if}
    <p class="credentials__label">E-mail</p>
    <input type="email" required="required" bind:value={email} />
    <p class="credenstials__label">Password</p>
    <input type="password" required="required" bind:value={password} />
    <div>
      <button type="submit"> {operation} </button>
    </div>
    <a href="/forgotPassword">Forgot password</a>
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
