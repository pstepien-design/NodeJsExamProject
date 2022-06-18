<script>
  import { onMount } from 'svelte';
  import {getBeerValue, saveBeerValue, getUser, userHasClicked } from '../stores/store';
  import { navigate } from 'svelte-navigator';
  import io from 'socket.io-client';
  import Post from '../components/Post.svelte';
  import { getPosts } from '../service/PostService';

  const socket = io('http://localhost:3000');
  console.log(socket);
  let hasClicked;
  let counter = 30;
  socket.on('connect', async () => {
    const value = await getBeerValue()
    const user = await getUser();
    hasClicked = user.hasClicked
    console.log(value.valueOfBeer)
    counter = value.valueOfBeer
  })
  socket.on('incrementBeer', async({ data }) => {
    counter = counter * 1.1
    await saveBeerValue(counter)
  });

  function incrementBeer(event) {
    hasClicked = true;
    userHasClicked(hasClicked)
    socket.emit('beerIncremented', { data: counter });
  }

  let posts = [];
  onMount(async () => {
    const fetchedPosts = await getPosts();
    posts = fetchedPosts;
  });

  const handleClick = (post) => {
    const id = (posts.indexOf(post))+1;
    navigate(`/post/${id}`);
  }
</script>

<div class="page_container">
  <div class="column_left">
    <h1>POSTS</h1>
    {#each posts as post}
     <div  on:click={handleClick(post)}>
      <Post
        title={post.title}
        text={post.text}
        timestamp={post.timestamp}
        likes={post.likes}
        comments={post.comments}
        areCommentsVisible=false
      />
    </div>
    {/each}
  </div>
  <div class="column_right">
    <h1>BEER</h1>
    <div class="test" style="height: {counter}px; width: {counter}px;"></div>
    {#if hasClicked !== true}
    <button on:click={incrementBeer}>click me</button>
    {/if}
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
  .test {
    justify-content: center;
    display: flex;
    background-color: red;
  }
</style>
