<script>
  import recipes from '../public/recipes/recipes.js';
  import { getCocktails } from '../stores/store.js';
  import { onMount } from 'svelte';

  let cocktails = [];
  let composedRecipes = [];

  const composeRecipes = async (cocktails) => {
    let newRecipes = [];
    cocktails.forEach((cocktail) => {
      recipes.filter((element) => {
        if (element.name == cocktail.name) {
          newRecipes.push(element);
        }
      });
    });
    return newRecipes;
  };

  onMount(async () => {
    cocktails = await getCocktails();
    composedRecipes = await composeRecipes(cocktails);
  });
</script>

<div class="Recipe_container">
  {#await getCocktails()}
    <p>...loading recipes</p>
  {:then}
    {#each composedRecipes as recipe}
      <div class="Recipe_box">
        <div>{recipe.name}</div>
        <div>Glass type: {recipe.glass}</div>
        <div>Category: {recipe.category}</div>
        {#each recipe.ingredients as ingredient}
          {#if ingredient.unit}
            <div>Unit: {ingredient.unit || ''}</div>
            <div>Amount: {ingredient.amount || ''}</div>
            <div>Ingredint: {ingredient.ingredient || ''}</div>
            {#if ingredient.special}
              <div>Special Ingredient: {ingredient.special || ''}</div>
            {/if}
          {/if}
        {/each}
        <div>Preparation: {recipe.preparation}</div>
      </div>
    {/each}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>

<style>
  .Recipe_container {
    color: white;
    background-color: black;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
  }

  .Recipe_box {
    border-style: solid;
    flex: 1 0 21%;
    margin-bottom: 10%;
  }
</style>
