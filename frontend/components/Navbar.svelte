<script>
  import { Router, Link, Route } from 'svelte-navigator';
  import Welcome from '../pages/Welcome.svelte';
  import Login from '../pages/Login.svelte';
  import Signup from '../pages/Signup.svelte';
  import Profile from '../pages/Profile.svelte';
  import Recipes from '../pages/Recipes.svelte';
  import { onMount } from 'svelte';
  import Posts from '../pages/Posts.svelte';
  import Cocktails from '../pages/Cocktails.svelte';
  import SinglePostPage from '../pages/SinglePostPage.svelte';
  import ProtectedRoute from './ProtectedRoute.svelte';
  import ForgotPassword from '../pages/ForgotPassword.svelte';
import { getPhoto } from '../service/ProfileService';
  import {
    removeAccessToken,
    removeRefreshToken,
    getRefreshToken,
    removeUserId,
    getUser,
  } from '../stores/store';

  $: isAuthorized = false;

  let loggedUser = '';
  let photo;

  const logOut = () => {
    removeAccessToken();
    removeRefreshToken();
    removeUserId();
    authChecker();
    isAuthorized = false;
  };

  const authChecker = async () => {
    /* isAuthorized = await checkAuthorization(); */
  };

  const getProfilePhoto = async () => {
    photo = await getPhoto();
  };

  onMount(async () => {
    const user = await getUser();
    if (user !== null) {
      loggedUser = user;
      isAuthorized = true;
    }
  });

  const checkAuthorization = async (token) => {
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
        <li>
          <Link to="/posts">
            <p class="link">POSTS</p>
          </Link>
        </li>
        <li>
          <Link to="/cocktails">
            <p class="link">COCKTAILS</p>
          </Link>
        </li>
        <li>
          <Link to="/recipes">
            <p class="link">RECIPES</p>
          </Link>
        </li>
        <li class="profile">
          <p>Welcome back, {loggedUser.firstName}</p>
          <Link to="profile">
            <div class="icon">
              {#await getProfilePhoto()}
              <p></p>
            {:then}
            <img src={photo} width="100" height="100" alt="Profile Image" />
            {:catch error}
            <p style="color: red">{error}</p>
          {/await}
            </div>
          </Link>
        </li>
      {/if}
    </ul>
    <Route path="/" component={Welcome} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/profile" component={Profile} />
    <Route path="/forgotPassword" component={ForgotPassword} />
    <ProtectedRoute path="/posts" component={Posts} />
    <ProtectedRoute path="/post/:id" component={SinglePostPage} />
    <ProtectedRoute path="/cocktails/" component={Cocktails} />
    <ProtectedRoute path="/recipes/" component={Recipes} />
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
  .profile {
    position: fixed;
    right: 0vw;
    display: flex;
    align-items: center;
  }
  .icon {
    margin-left: 20px;
    margin-top: 1vh;
    margin-bottom: 1vh;
    height: 10vh;
    color: #ea5045;
  }

  img{
    border-radius: 50%;
  }
  p {
    padding-top: 10px;
  }
  nav {
    padding: 0;
    height: 97vh;
    overflow: hidden;
  }
</style>
