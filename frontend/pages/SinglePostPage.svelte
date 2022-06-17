<script>
  import { onMount } from "svelte";
  import Post from "../components/Post.svelte";
  import { getPosts } from "../service/PostService";
    
  let post

  onMount(async () => {
    const fetchedPosts = await getPosts();
    post = fetchedPosts[0];
    console.log(post)
  });
</script>

 <Post
  title={post.title}
  text={post.text}
  timestamp={post.timestamp}
  likes={post.likes}
  comments={post.comments}
  areCommentsVisible="false"
/> 
