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

  const requestEmailChange = async (event) => {
    console.log('email change requested');
  };

  const handleOnSubmit = async () => {
    updateUser(userFirstName, userLastName);
  };
</script>

<div class="profile_container">
  <div class="user-info_box">
    <h1 class="profile-welcome_title">Welcome to your profile page</h1>
    <h3 class="profile-welcome_title">
      Here you can edit your first and last name, or request an email change
    </h3>
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
        <button on:click|preventDefault={requestEmailChange()}
          >Request email change</button
        >
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
    color: white;
    background-color: black;
    overflow: auto;
    height: 100vw;
    width: 100vw;
    display: flex;
    justify-content: center;
  }
  .user-info_box {
    margin-top: 5vw;
    height: 33vw;
    width: 33vw;
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
    color: #72c320;
  }
  .profile_submit {
    margin-top: 1.5vw;
  }
  .profile_email {
    margin-bottom: 0.7vw;
  }
  .profile_submit-button {
    background-color: #3bc340;
    border-color: #3bc340;
    border-radius: 30px;
  }

  .profile-welcome_title {
    border: none;
    font-weight: normal;
  }
</style>
