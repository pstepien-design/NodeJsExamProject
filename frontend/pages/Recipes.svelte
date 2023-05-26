<script>
  import recipes from '../public/recipes/recipes.js';
  import { getCocktails } from '../stores/store.js';

  let cocktails = [];
  let composedRecipes = [];

  const composeRecipes = async (cocktails) => {
    let newRecipes = [];
    await cocktails.forEach((cocktail) => {
      recipes.filter((element) => {
        if (element.name == cocktail.name) {
          newRecipes.push(element);
        }
      });
    });
    
    return newRecipes;
  };

  const loadCocktailsPage = async () => {
    cocktails = await getCocktails();
    composedRecipes = await composeRecipes(cocktails); 
  }
</script>

<div class="recipes_container">
  {#await loadCocktailsPage()}
    <p>Loading ...</p>
  {:then}
    {#each composedRecipes as recipe}
      <div class="recipe_box">
        <h1>{recipe.name}</h1>
        <p><strong>Glass type: </strong> {recipe.glass}</p>
        <p><strong>Category: </strong> {recipe.category}</p>
        <h3>Ingredients</h3>
        {#each recipe.ingredients as ingredient}
          {#if ingredient.unit}
            <p>{ingredient.amount || ''}  {ingredient.unit || ''} {ingredient.ingredient || ''}</p>
            {#if ingredient.special}
              <div><strong>Special Ingredient: </strong> {ingredient.special || ''}</div>
            {/if}
          {/if}
        {/each}
        <h3>Preparation</h3>
        <p> {recipe.preparation}</p>
      </div>
    {/each}
  {:catch error}
    <p style="color: red">Error! Try again</p>
  {/await}
</div>

<style>
  .recipes_container {
    color: black;
    background-color: white;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    height: 85vh;
    margin-bottom: 15px;
  }

  .recipe_box {
    flex: 1 0 28%;
    margin: 10px;
    height: auto;
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #D3D3D3;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #ababab;
  }
</style>
