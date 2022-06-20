<script>
  import Cocktails from '../components/Cocktails.svelte';
  import { getCocktails } from '../stores/store.js';
  import { onMount } from 'svelte';
  let cocktails = [];
  onMount(async () => {
    const fetchedCocktails = await getCocktails();
    cocktails = fetchedCocktails;
  });
</script>

<div class="cocktail_container">
  {#each cocktails as cocktail}
    <div class="cocktail_box">
      <Cocktails
        name={cocktail.name}
        description={cocktail.description}
        img={cocktail.image}
      />
    </div>
  {/each}
</div>

<style>
  .cocktail_container {
    background-color: black;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
  }
  .cocktail_box {
    flex: 1 0 21%;
  }
</style>
