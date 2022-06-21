import { get } from 'svelte/store';
import { getToken, serverUrl } from '../stores/store';

export async function getPosts() {
  const token = getToken();

  const res = await fetch(`${get(serverUrl)}/get/posts/${token}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });

  if (res.ok) {
    const json = await res.json();

    return json.data;
  }
}

export async function addPost(title, text, postedBy) {
  const token = getToken();

  const res = await fetch(`${get(serverUrl)}/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title, text, token, postedBy
    }),
    headers: {
      'content-type': 'application/json',
    },
  });

  if (res.ok) {
    const json = await res.json();

    return json.data;
  }
}

export async function addComment(comment, postId){
  const token = getToken();
  const key = postId

  const res = await fetch(`${get(serverUrl)}/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      token, comment, key
    }),
    headers: {
      'content-type': 'application/json',
    },
  });

  if (res.ok) {
    const json = await res.json();

    return json.data;
  }
}

export async function getComments(postId){
  const key = postId
  const token = getToken();

  const res = await fetch(`${get(serverUrl)}/posts/${key}/comments/${token}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });

  if (res.ok) {
    const json = await res.json();

    return json.data;
  }
}


