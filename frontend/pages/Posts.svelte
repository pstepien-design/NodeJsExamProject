<script>
  import { onMount } from "svelte";
  import {
    getBeerValue,
    saveBeerValue,
    getUser,
    userHasClicked,
  } from "../stores/store";
  import { navigate } from "svelte-navigator";
  import io from "socket.io-client";
  import Post from "../components/Post.svelte";
  import { getPosts } from "../service/PostService";
  import ModalContent from "../components/ModalContent.svelte";
  import Modal from "svelte-simple-modal";


  const socket = io("http://localhost:3000");
  console.log(socket);
  let hasClicked;
  let counter = 30;
  socket.on("connect", async () => {
    const value = await getBeerValue();
    const user = await getUser();
    /*  hasClicked = user.hasClicked */
    hasClicked = false;
    console.log(value.valueOfBeer);
    counter = value.valueOfBeer;
  });
  socket.on("incrementBeer", async ({ data }) => {
    counter = counter * 1.1;
    await saveBeerValue(counter);
  });

  function incrementBeer(event) {
    hasClicked = true;
    userHasClicked(hasClicked);
    socket.emit("beerIncremented", { data: counter });
  }

  let posts = [];
  onMount(async () => {
    const fetchedPosts = await getPosts();
    posts = fetchedPosts;
  });

  const handleClick = (post) => {
    const id = posts.indexOf(post) + 1;
    navigate(`/post/${id}`);
  };
</script>

<div class="page_container">
  <Modal><ModalContent /></Modal>
  <div class="column_left">
    <h1>POSTS</h1>
    {#each posts as post}
      <div on:click={handleClick(post)}>
        <Post
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
      ¨
      {#if hasClicked !== true}
        <button class="beer__increment__button" on:click={incrementBeer}
          >Click to increment beer!</button
        >
      {/if}
    </div>
  </div>
</div>

<style>
  h1 {
    font-size: 30px;
  }
  .page_container {
    height: 100%;
    overflow: auto;
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
</style>
