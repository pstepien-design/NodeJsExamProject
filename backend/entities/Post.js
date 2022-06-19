class Post {
    constructor(id, title, text, timestamp, comments = [], likes = []) {7
        this.id = id;
        this.title = title;
        this.text = text;
        this.timestamp = timestamp;
        this.comments = comments;
        this.likes = likes;
    }
}

export default Post;