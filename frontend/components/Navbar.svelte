<script>
  import { Router, Link, Route } from 'svelte-navigator';
  import Welcome from '../pages/Welcome.svelte';
  import Login from '../pages/Login.svelte';
  import Signup from '../pages/Signup.svelte';
  import { onMount } from 'svelte';
  import Home from '../pages/Home.svelte';
  import ProtectedRoute from './ProtectedRoute.svelte';
  import { getUser } from '../service/AuthorizationService';
  import {
    removeToken,
    removeRefreshToken,
    getRefreshToken,
    removeUserId,
    doesUserExist,
  } from '../stores/store';

  $: isAuthorized = false;

  const logOut = () => {
    removeToken();
    removeRefreshToken();
    removeUserId();
    authChecker();
    isAuthorized = false;
  };

  const authChecker = async () => {
    /* isAuthorized = await checkAuthorization(); */
  };

  onMount(async () => {
    isAuthorized = await doesUserExist();
  });

  const checkAuthorization = async (token) => {
    console.log(getRefreshToken());
    const authRequest = {
      refreshToken: getRefreshToken(),
    };
    const response = await fetch('http://localhost:3000/auth/refreshToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authRequest),
    });
    if (!response.ok) {
      console.log('oopsie whoopsie');
      return false;
    } else {
      return true;
    }
  };

  authChecker();
</script>

<Router>
  <nav>
    <ul hidden>
      {#if isAuthorized}
        <li>
          <Link to="/">
            <p on:click={logOut} class="link">LOG OUT</p>
          </Link>
        </li>
      {/if}
    </ul>
    <Route path="/" component={Welcome} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <ProtectedRoute path="/home" component={Home} />
  </nav>
</Router>

<style>
  li {
    color: white;
    vertical-align: middle;
    font-size: 24px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 20px;
    margin-right: 20px;
  }
  ul {
    display: flex;
    margin: 0;
    flex-direction: row;
    justify-content: flex-start;
    list-style: none;
    text-decoration: none;
    white-space: nowrap;
    width: 100%;
    background-color: #233249;
    height: 12vh;
    padding: 0;
    overflow: auto;
  }
  li:nth-child(1) {
    background-color: #ea5045;
    font-weight: bold;
    color: black;
    margin-left: 0;
    padding-left: 2vw;
    width: 10vw;
    padding-right: 2vw;
    height: 100%;
    align-items: center;
  }
  .link {
    color: white;
    vertical-align: middle;
    font-size: 24px;
  }
  p {
    padding-top: 10px;
  }
  nav {
    padding: 0;
    height: 97vh;
  }
</style>
