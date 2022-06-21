<script>
  import { onMount } from 'svelte';
  import MdThumbUp from 'svelte-icons/md/MdThumbUp.svelte';
  export let title,
    text,
    timestamp,
    likes,
    comments,
    areCommentsVisible,
    postedBy;
  import { addComment, getComments, getPosts } from '../service/PostService';

  let newComment;
  let id = window.location.pathname.replace('/post/', '');
  let post;
  let count = -1;

  let commentsValues = Object.values(comments);
  const getNumberOfComments = () => {
    for (let key in comments) {
      ++count;
    }
  };

  const addNewComment = async () => {
    let postKey = post.id;
    const response = await addComment(newComment, postKey);
    if (response !== null) {
      const com = await getComments(postKey);
      commentsValues = Object.values(await getComments(postKey));
      newComment = '';
      ++count;
    }
  };

  onMount(async () => {
    const fetchedPosts = await getPosts();
    post = fetchedPosts[id - 1];
    getNumberOfComments();
  });
</script>

<div class="post">
  <div class="post__info">
    <div class="post__title">
      <p class="title">{title}</p>
    </div>
    <div class="post__time">
      <p>User: {postedBy}</p>
      <p class="timestamp">{timestamp}</p>
    </div>
  </div>
  <div class="post__text">
    <p>{text}</p>
  </div>
  <div class="post__interactions">
    <div class="post__likes">
      <p class="likes">{likes}</p>
      <div class="icon">
        <MdThumbUp />
      </div>
    </div>
    <div class="post__comments">
      <p class="comments">{count} comments</p>
    </div>
  </div>
  <div class="displayed__comments">
    {#if areCommentsVisible === 'true'}
      <form on:submit|preventDefault={addNewComment}>
        <p>Add comment</p>
        <input
          type="text"
          class="comment__input"
          required="required"
          bind:value={newComment}
        />
      </form>
      {#key commentsValues}
        {#each commentsValues as comment}
          <p>{comment}</p>
        {/each}
      {/key}
    {/if}
  </div>
</div>

<style>
  .post {
    background-color: #c4bfbf57;
    padding: 5px;
    margin: 20px;
    border: 2px solid #c4bfbf57;
    display: block;
    overflow-y: auto;
  }
  .post__interactions {
    margin-bottom: 2px;
    height: 40px;
  }
  .displayed__comments {
    text-align: center;
  }
  .comment__input {
    width: 80%;
  }
  .comments {
    float: right;
  }
  .likes {
    float: left;
  }
  .icon {
    width: 15px;
    margin: 16px;
  }
  .post__info {
    background-color: #edebeb57;
    height: 40px;
    border: 2px solid #1f1e1e57;
  }
  .post__likes {
    float: left;
    width: 20%;
    display: flex;
  }
  .post__comments {
    float: right;
    width: 80%;
  }
  .post__title {
    float: left;
    width: 70%;
  }
  .post__time {
    float: right;
    width: 30%;
  }
  .title {
    float: left;
    margin-left: 10px;
    font-size: 15px;
    font-weight: bold;
  }
  .timestamp {
    font-size: 15px;
    float: right;
    margin-right: 10px;
  }
</style>
