<script>
  import { onMount } from "svelte";
  import Post from "../components/Post.svelte";
  import { getPosts } from "../service/PostService";

  let post = {};
  let id = window.location.pathname.replace("/post/", "");
  let numbetrOfPosts;
  let commentsList = {};
  let displayPost = true;

  onMount(async () => {
    const fetchedPosts = await getPosts();
    numbetrOfPosts = fetchedPosts.length;
    if (id > numbetrOfPosts) {
      displayPost = false;
    }
    post = fetchedPosts[id - 1];
    commentsList = post.comments;
    console.log(commentsList)
  });
</script>

<div>
  {#if displayPost}
    <Post
      title={post.title}
      text={post.text}
      timestamp={post.timestamp}
      likes={post.likes}
      comments={commentsList}
      areCommentsVisible="true"
    />
  {:else}
    <h1>No post found, try again</h1>
  {/if}
</div>
