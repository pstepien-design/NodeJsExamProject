import { get } from 'svelte/store';
import { serverUrl } from '../stores/store';
export async function sendEmail(email) {
  const res = await fetch(`${get(serverUrl)}/sendEmail/${email}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });

  if (res.ok) {
    const json = await res.json();
    return json.wasSent;
  }
}

export async function sendBeerEmail(email) {
  const res = await fetch(`${get(serverUrl)}/sendEmail/incrementBeer/${email}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });

  if (res.ok) {
    const json = await res.json();
    return json.wasSent;
  }
}
