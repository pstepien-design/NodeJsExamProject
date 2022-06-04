<script>
  import { Router, Link, Route } from 'svelte-navigator';
  import Welcome from '../pages/Welcome.svelte';
  import Login from '../pages/Login.svelte';
  import Signup from '../pages/Signup.svelte';
  import Home from '../pages/Home.svelte';
  import ProtectedRoute from './ProtectedRoute.svelte';
  import { removeToken } from '../stores/store';
  import { getToken } from '../stores/store';

  const logOut = () => {
    removeToken();
  };
  let isAuthorized = getToken();
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
