<script>
  import { onMount } from 'svelte';
  import Post from '../components/Post.svelte';
  import { getPosts } from '../service/PostService';
  let posts = [];
  onMount(async () => {
    const fetchedPosts = await getPosts();
    posts = fetchedPosts;
  });
</script>

<div class="page_container">
  <div class="column_left">
    <h1>POSTS</h1>
    {#each posts as post}
      <Post
        title={post.title}
        text={post.text}
        timestamp={post.timestamp}
        likes={post.likes}
        comments={post.comments}
        areCommentsVisible=false
      />
    {/each}
  </div>
  <div class="column_right"><h1>BEER</h1></div>
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
</style>
