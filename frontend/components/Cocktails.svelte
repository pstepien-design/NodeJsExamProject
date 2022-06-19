<script>
export let name, description, img;
</script>

<div class="cocktail_box">
  <div class="name">{name}</div>
  <img src="{img}" alt="cocktail" width="300" height="300">
  <div class="description">{description}</div>
</div>

<style>
 .name {
  margin-top: 20px;
  font-size: 30px;
  color:#f6ff7f;
 }

 .description {
  margin-top: 1.2vw;
  color: white;
 }

 .cocktail_box {
  /* margin-inline: 50px; */
  height: 25vw;
  width: 25vw;
 }
</style>