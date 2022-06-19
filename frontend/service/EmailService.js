import { get } from "svelte/store";
import { serverUrl } from "../stores/store";
export async function sendEmail(email) {

  const res = await fetch(`${get(serverUrl)}/sendEmail`, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  if (res.ok) {
    const json = await res.json();
    return json.wasSent
  }
}
