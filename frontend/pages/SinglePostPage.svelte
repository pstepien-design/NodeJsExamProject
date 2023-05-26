<script>
  import Post from '../components/Post.svelte';
  import { getPosts } from '../service/PostService';

  let post = {};
  let comments = {};
  let id = window.location.pathname.replace('/post/', '');
  let numbetrOfPosts;
  let displayPost = false;

  const loadingSinglePost = async() => {
    const fetchedPosts = await getPosts();
    numbetrOfPosts = fetchedPosts.length;
    post = fetchedPosts[id - 1];
    comments = post.comments;
    if (id <= numbetrOfPosts && comments !== {}) {
      displayPost = true;
    }
  }
</script>

<div>
  {#await loadingSinglePost()}
  <p>Loading ...</p>
{:then}
  {#if displayPost}
    <div>
      <Post
        postedBy={post.postedBy}
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
  {:catch error}
  <p style="color: red">Error! Try again</p>
{/await}
</div>

<style>
  div {
    overflow-y: auto;
    height: 100%;
  }
</style>
