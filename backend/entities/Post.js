class Post {
    constructor(title, text, timestamp, comments = [], likes = []) {
        this.title = title;
        this.text = text;
        this.timestamp = timestamp;
        this.comments = comments;
        this.likes = likes;
    }
}

export default Post;