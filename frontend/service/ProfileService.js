import { getAccessToken, serverUrl } from "../stores/store";
import { get } from "svelte/store";

export async function getPhoto() {
  const token = getAccessToken();

  const res = await fetch(`${get(serverUrl)}/users/profile`, {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res);

  if (res.ok) {
    const blob = await res.blob();
    console.log(blob);
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
  }
}
