<script>
  import { onMount } from 'svelte';
  import { getUser } from '../stores/store';
  import SvelteTooltip from 'svelte-tooltip';
  let user;
  onMount(async () => {
    user = await getUser();
    console.log(user);
  });
</script>

<div class="profile_container">
  <div class="user-info_box">
    {#await getUser()}
      <p>...loading user profile</p>
    {:then user}
      <form>
        <div class="profile_titles">First Name</div>
        <input type="text" value={user.firstName} />
        <div class="profile_titles">Last Name</div>
        <input type="text" value={user.lastName} />
        <div class="profile_titles">Email</div>
        <input type="text" value={user.email} />
        <div class="profile_titles">userId</div>
        <SvelteTooltip tip="This is your unique userId">
          <div class="profile_border">{user.id}</div>
        </SvelteTooltip>
        <div class="profile_submit">
          <input type="submit" value="Submit" />
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
</style>
