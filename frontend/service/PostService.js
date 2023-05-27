import { get } from "svelte/store";
import { getAccessToken, serverUrl } from "../stores/store";

export async function getPosts() {
  const token = getAccessToken();

  const res = await fetch(`${get(serverUrl)}/get/posts`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const json = await res.json();

    return json.data;
  }
}

export async function addPost(title, text, postedBy, postAvailability, userId) {
  const token = getAccessToken();
  console.log(userId);

  const res = await fetch(`${get(serverUrl)}/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      text,
      postedBy,
      isPrivate: postAvailability,
      userId,
    }),
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const json = await res.json();

    return json.data;
  }
}

export async function addComment(comment, postId) {
  const token = getAccessToken();
  const key = postId;

  const res = await fetch(`${get(serverUrl)}/posts/${postId}/comments`, {
    method: "PATCH",
    body: JSON.stringify({
      comment: comment,
    }),
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const json = await res.json();

    return json.data;
  }
}

export async function getComments(postId) {
  const key = postId;
  const token = getAccessToken();

  const res = await fetch(`${get(serverUrl)}/posts/${key}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const json = await res.json();
    return json.data.comments;
  }
}
