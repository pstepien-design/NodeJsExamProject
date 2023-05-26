<script>
  import Cocktails from '../components/Cocktails.svelte';
  import { getCocktails } from '../stores/store.js';

  let cocktails = [];

  const loadCocktailsPage = async () => {
    const fetchedCocktails = await getCocktails();
    cocktails = fetchedCocktails;
  }
</script>

<div class="cocktail_container">
  {#await loadCocktailsPage()}
    <p>Loading ...</p>
  {:then}
  {#each cocktails as cocktail}
    <div class="cocktail_box">
      <Cocktails
        name={cocktail.name}
        description={cocktail.description}
        img={cocktail.image}
      />
    </div>
  {/each}
  {:catch error}
  <p style="color: red">Error! Try again</p>
{/await}
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
    margin-bottom: 10%;
  }
</style>
