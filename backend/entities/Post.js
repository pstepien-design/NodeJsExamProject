class Post {
  constructor(id, title, text, timestamp, comments = [], likes = [], postedBy) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.timestamp = timestamp;
    this.comments = comments;
    this.likes = likes;
    this.postedBy = postedBy;
  }
}

export default Post;
