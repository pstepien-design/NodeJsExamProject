<script>
  import {
    getBeerValue,
    saveBeerValue,
    getUser,
    userHasClicked,
  } from '../stores/store';
  import { navigate } from 'svelte-navigator';
  import Post from '../components/Post.svelte';
  import { getPosts } from '../service/PostService';
  import ModalContent from '../components/ModalContent.svelte';
  import Modal from 'svelte-simple-modal';
  import { getNotificationsContext } from 'svelte-notifications';

  const { addNotification } = getNotificationsContext();

  const displayNotification = () => {
    addNotification({
      text: 'Thank you for incrementing the beer, we sent you an email with the confirmation',
      position: 'top-center',
      type: 'success',
      removeAfter: 3000,
    });
  };

  let hasClicked;
  let counter = 30;
  let user;

  // socket.on('connect', async () => {
  //   const value = await getBeerValue();

  //   hasClicked = user.hasClicked;
  //   counter = value.valueOfBeer;
  // });

  // socket.on('incrementBeer', async ({ data }) => {
  //   counter = counter * 1.1;
  //   await saveBeerValue(counter);
  // });

  async function incrementBeer(event) {
    // hasClicked = true;
    // userHasClicked(hasClicked);
    // socket.emit('beerIncremented', { data: counter });
    // const response = await sendBeerEmail(user.email);
    // if (response) {
    //   displayNotification();
    // }
  }

  let posts = [];

  const handleClick = (post) => {
    const id = posts.indexOf(post) + 1;
    navigate(`/post/${id}`);
  };

  const loadPostsPage = async () => {
    user = await getUser();
    const fetchedPosts = await getPosts();
    posts = fetchedPosts;
  };
</script>

<div class="page_container">
  {#await loadPostsPage()}
    <p>Loading ...</p>
  {:then}
    <Modal
      styleBg={{ backgroundColor: 'rgb(0 0 0 / 15%) 0px 10px 10px 10px' }}
      styleWindow={{
        boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.15)',
        backgroundColor: '#233249',
        color: 'white',
      }}><ModalContent text={'Add new post'} action={'ADD_POST'} /></Modal
    >
    <div class="column_left">
      <h1 class="text_shadow">POSTS</h1>
      {#each posts as post}
        <div on:click={handleClick(post)}>
          <Post
            postedBy={post.postedBy}
            title={post.title}
            text={post.text}
            timestamp={post.timestamp}
            likes={post.likes}
            comments={post.comments}
            areCommentsVisible="false"
          />
        </div>
      {/each}
    </div>
    <div class="column_right">
      <div class="mug-container">
        <div class="mug">
          <div class="beer" style="height: {counter}px; " />
        </div>
        {#if hasClicked !== true}
          <button class="beer__increment__button" on:click={incrementBeer}
            >Click to increment beer!</button
          >
        {/if}
      </div>
    </div>
  {:catch error}
    <p style="color: red">Error! Try again</p>
  {/await}
</div>

<style>
  h1 {
    font-size: 30px;
  }
  .page_container {
    height: 100%;
    overflow: auto;
    /* background-color: black; */
  }
  .column_left {
    width: 70%;
    float: left;
    margin-bottom: 100px;
  }
  .column_right {
    width: 30%;
    float: right;
  }
  .beer {
    width: 100%;
    max-height: 100%;
    background: linear-gradient(
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 1) 5%,
      rgba(237, 237, 173, 1) 10%,
      rgba(229, 197, 57, 1) 40%,
      rgba(229, 197, 57, 1) 100%
    );
    background-repeat: repeat;
    background-size: 100% 200%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .mug-container {
    position: absolute;
    top: 40vh;
    width: 28vw;
  }
  .mug {
    margin-left: auto;
    margin-right: auto;
    border: 20px solid #eee;
    border-bottom-width: 30px;
    width: 150px;
    height: 250px;
    border-top: none;
    border-radius: 0 0 10px 10px;
    position: relative;
  }
  .beer__increment__button {
    width: 190px;
    background-color: #ffc457;
    margin-top: 20px;
  }

  .text_shadow {
    text-shadow: 1px 1px;
  }
</style>
