<script>
  import { onMount } from 'svelte';
  import { serverUrl } from '../stores/store';
  import { get } from 'svelte/store';
  import io from 'socket.io-client';

  const socket = io('http://localhost:3000');
  console.log(socket);
  
  let lastPersonToChangeAColor;
  let counter = 30;

  socket.on('changeTheColor', ({ data }) => {
    console.log(data)
    counter = counter * 1.5
    document.body.style.backgroundColor = data;
    lastPersonToChangeAColor = username;
  });

  function changeColor(event) {
    socket.emit('colorChanged', { data: event.target.value });
  }

  /* onMount(async () => {
    const response = await fetch(`${get(serverUrl)}`);
    const { data } = await response.json();

    firstName = data;
  }); */
</script>

<div>
  <h1>WELCOME TO THE HOME PAGE</h1>
  <h2>
    Last person to change the color: {lastPersonToChangeAColor || 'noone'}"
  </h2>
  <div class="test" style="height: {counter}px; width: {counter}px;">{counter}</div>
  <input type="color" on:change={changeColor} />
  <button on:click={changeColor}>click me</button>
</div>

<style>
  h1 {
    font-size: 30px;
  }

  .test {
    justify-content: center;
    display: flex;
    margin-left: 50%;
    background-color: red;
  }

</style>
