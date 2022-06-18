<script>
  import MdThumbUp from 'svelte-icons/md/MdThumbUp.svelte';
  export let title, text, timestamp, likes, comments, areCommentsVisible;
  

  const getNumberOfComments = () => {
    let count = 0;
    console.log('komentarze', comments)
    for (let key in comments) {
      ++count;
    }
    return count;
  };
</script>

<div class="post">
  <div class="post__info">
    <div class="post__title">
      <p class="title">{title}</p>
    </div>
    <div class="post__time">
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
      <p class="comments">{getNumberOfComments()} comments</p>
    </div>
    {#if areCommentsVisible === true}
    <div class='comments'>
      <p>{comments}</p>
    </div>
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
    overflow: auto;
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
