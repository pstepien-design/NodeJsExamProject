<script>
  import { onMount } from 'svelte';
  import { getUser, updateUser } from '../stores/store';
  import SvelteTooltip from 'svelte-tooltip';

  let user;
  let userFirstName;
  let userLastName;
  let userEmail;
  let userId;

  onMount(async () => {
    user = await getUser();
    userFirstName = user.firstName;
    userLastName = user.lastName;
    userEmail = user.email;
    userId = user.id;
  });

  const handleOnSubmit = async () => {
    updateUser(userFirstName, userLastName);
  };
</script>

<div class="profile_container">
  <h1 class="profile-welcome_title">Welcome to your profile page</h1>
  <h3 class="profile-welcome_title">
    Here you can edit your first and last name, or request an email change
  </h3>
  <div class="user-info_box">
    {#await getUser()}
      <p>...loading user profile</p>
    {:then}
      <form on:submit={handleOnSubmit}>
        <div class="profile_titles">First Name</div>
        <input type="text" id="firstName" bind:value={userFirstName} />
        <div class="profile_titles">Last Name</div>
        <input type="text" id="lastName" bind:value={userLastName} />
        <div class="profile_titles">Email</div>
        <div class="profile_email">{userEmail}</div>
        <div class="profile_titles">userId</div>
        <SvelteTooltip tip="This is your unique userId">
          <div class="profile_border">{userId}</div>
        </SvelteTooltip>
        <div class="profile_submit">
          <input
            class="profile_submit-button"
            type="submit"
            value="Save profile"
          />
        </div>
      </form>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  </div>
</div>

<style>
  .profile_container {
    color: black;
    overflow: auto;
    height: 100%;
    width: 100%;
  }
  .user-info_box {
    margin-top: 5vw;
    /* border-style: solid; */
    /* border-color: red; */
  }

  .profile_titles {
    margin-bottom: 0.7vw;
    font-size: 25px;
  }
  .profile_border {
    justify-content: center;
    border-style: solid;
    border-radius: 1px;
    color: #ea5045;
  }
  .profile_submit {
    margin-top: 1.5vw;
  }
  .profile_email {
    margin-bottom: 0.7vw;
  }
  .profile_submit-button {
    font-size: 2rem;
    border-radius: 12px;
    width: 30%;
    height: 60px;
    font-weight: 20px;
    margin-top: 20px;
    background-color: #ea5045;
  }
  input {
    width: 30%;
    height: 50px;
  }

  .profile-welcome_title {
    border: none;
  }
</style>
