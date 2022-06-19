<script>
import { getContext } from "svelte";
import AddPost from "../components/AddPost.svelte";


const { open } = getContext('simple-modal')
const showModal = () => open(AddPost)

</script>
<p><button on:click={showModal}>Add new post!</button></p>

<style>
    button {
    font-size: 2rem;
    border-radius: 12px;
    width: 30%;
    height: 60px;
    font-weight: 20px;
    margin-top: 20px;
    background-color: #ea5045;
  }
</style>