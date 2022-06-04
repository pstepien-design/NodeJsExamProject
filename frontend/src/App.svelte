<script>
  import Login from '../pages/Login.svelte';
  import Signup from '../pages/Signup.svelte';
  import Footer from '../components/Footer.svelte';
  import Navbar from '../components/Navbar.svelte';
</script>

<main>
  <Navbar />
  <Footer />
</main>

<style>
  :global(body) {
    padding:0;
    font-family: Roboto;
  }
  main {
    text-align: center;
    max-width: 240px;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
