<script>
  import { navigate } from "svelte-navigator";
  const goToLogin = () => {
    navigate('/login');
  };
  const goToSignUp = () => {
    navigate('/signup');
  };
</script>

<div class="welcome__container">
  <div class="credentials__container">
    <h1>Welcome to this website</h1>
    <h2>Login or sign up to continue</h2>
    <div class="buttons__container">
      <button on:click={goToLogin}>Login</button>
      <button on:click={goToSignUp}>Sign up</button>
    </div>
  </div>
  <div class="image__container">
    <input type="image" src="images/cocktail.png" alt="cocktail image" />
  </div>
</div>

<style>
  h1 {
    text-transform: uppercase;
    font-size: 50px;
  }
  h2{
    font-size: 30px;
  }
  .buttons__container {
    margin-top: 10vh;
    display: flex;
    justify-content: center;
  }
  button {
    width: 25vw;
    height: 15vh;
    font-size: 25px;
    font-weight: bold;
    background-color: #ea5045;
    margin-left: 20px;
  }
  .credentials__container {
    width: 70%;
    float: left;
  }
  .welcome__container {
    margin: 10vh;
  }
  input {
    border: 0;
    height: 50vh;
  }
</style>
