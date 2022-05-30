<script>
import { onMount } from "svelte";
import { login, signup} from '../service/AuthorizationService'

  let email = '';
  let password = '';

  export let operation = '';


  const handleUserRequest = async () => {
    console.log(email, password);
    if(operation === 'Login'){
      login(email, password);
  }
    else if( operation === 'Sign up'){
    signup(email, password);
  }
    else {
      console.log('something went wrong');
    }
  }

</script>
<div>
  <p class="credentials__header">{operation}</p>
  <p class="credentials__text">{operation} by typing your email and password</p>
  <form on:submit|preventDefault={handleUserRequest} class="credentials__form">
    <p class="credentials__label">E-mail</p>
    <input type="email" required='required' bind:value={email} />
    <p class="credenstials__label">Password</p>
    <input type="password" required='required' bind:value={password} />
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
    width: 30%;
    height: 50px;
    font-weight: 20px;
    margin-top: 20px;
    background-color: #ea5045;
  }
</style>
