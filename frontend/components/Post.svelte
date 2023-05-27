<script>
  import dayjs from 'dayjs';
  import MdThumbUp from "svelte-icons/md/MdThumbUp.svelte";
  export let title,
    text,
    likes,
    comments,
    timestamp,
    areCommentsVisible,
    postedBy;
  import { addComment, getComments, getPosts } from "../service/PostService";

  let newComment;
  let id = window.location.pathname.replace("/post/", "");
  let post;
  let count = 0;
  let formattedDate;

  let commentsValues = Object.values(comments);
  const getNumberOfComments = () => {
    for (let comment of comments) {
      ++count;
    }
  };

  const addNewComment = async () => {
    let postKey = post._id;
    const response = await addComment(newComment, postKey);
    if (response !== null) {
      const com = await getComments(postKey);
      commentsValues = await getComments(postKey);
      console.log(commentsValues);
      newComment = "";
      ++count;
    }
  };

  const loadPost = async () => {
    const fetchedPosts = await getPosts();
    post = fetchedPosts[id - 1];
    getNumberOfComments();
    formattedDate = dayjs(timestamp).format("DD/MM/YYYY HH:mm");

  };
</script>
{#await loadPost()}
<p>Loading ...</p>
{:then}
<div class="post">
  <h2 class="title">{title}</h2>
  <p class="timestamp">{formattedDate} by {postedBy}</p>
  <p class="text">{text}</p>
    <div class="post__likes">
      <p class="likes">{likes.length}</p>
      <div class="icon">
        <MdThumbUp />
      </div>
    </div>
    <div class="post__comments">
      <p class="comments">{count} comments</p>
    </div>
  <div class="displayed__comments">
    {#if areCommentsVisible === "true"}
      <form on:submit|preventDefault={addNewComment}>
        <input
        placeholder="Type your comment here"
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
{:catch error}
<p style="color: red">Error! Try again</p>
{/await}

<style>
  .post {
    background-color: #d9d9d9;
    margin: 20px;
    border-radius: 10px;
    overflow-y: auto;
    box-shadow: 5px 5px 5px #949494;
    color: #233249;
    padding: 15px;
  }
  .title {
    margin-top: 10px;
    margin-left: 10px;
    text-align: start;
  }
  .timestamp {
    margin-top: 0px;
    margin-left: 10px;
    font-size: 15px;
    text-align: start;
  }
  .text {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 20px;
    text-align: start;
  }
  .comments {
    text-align: end;
    margin-right: 10px;
    margin-top: 10px;
  }
  .likes {
    margin-left: 10px;
    margin-top: 10px;
    text-align: start;
    font-size: 15px;
  }
  .icon {
    width: 25px;
    margin-left: 10px;
    margin-top: 4px;
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
  .displayed__comments {
    text-align: center;
  }
  .comment__input {
    width: 80%;
  }
</style>
