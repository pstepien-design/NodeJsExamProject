<script>
  import { onMount } from 'svelte';
  import Post from '../components/Post.svelte';
  import { getPosts } from '../service/PostService';

  let post = {};
  let comments = {};
  let id = window.location.pathname.replace('/post/', '');
  let numbetrOfPosts;
  let displayPost = false;

  onMount(async () => {
    const fetchedPosts = await getPosts();
    numbetrOfPosts = fetchedPosts.length;
    post = fetchedPosts[id - 1];
    console.log(post);
    comments = post.comments;
    console.log(post);
    if (id <= numbetrOfPosts && comments !== {}) {
      displayPost = true;
    }
  });
</script>

<div>
  {#if displayPost}
  <div>
    <Post
      id={post.id}
      title={post.title}
      text={post.text}
      timestamp={post.timestamp}
      likes={post.likes}
      {comments}
      areCommentsVisible="true"
    />
  </div>
  {:else}
    <h1>No post found, try again</h1>
  {/if}
</div>
<style>
  div{
    overflow-y: auto;
    height: 100%;
  }
</style>