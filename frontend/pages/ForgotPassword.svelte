<script>
  import { sendEmail } from '../service/EmailService';
  import { getNotificationsContext } from 'svelte-notifications';

  const { addNotification } = getNotificationsContext();
  export let email;

  const displayNotifcation = () => {
    addNotification({
      text: 'The message to reset the password has been sent. Please check your email',
      position: 'top-center',
      type: 'success',
      removeAfter: 3000,
    });
  };

  const forgotPassword = async () => {
    const response = await sendEmail(email);
    if (response === true) {
      displayNotifcation();
      email = '';
    }
  };
</script>

<h1>FORGOT PASSWORD</h1>
<h2>Type in your email to restore the password</h2>
<form on:submit|preventDefault={forgotPassword} class="credentials__form">
  <p class="credentials__label">E-mail</p>
  <input type="email" required="required" bind:value={email} />
  <div>
    <button type="submit">Forgot password</button>
  </div>
</form>

<style>
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
