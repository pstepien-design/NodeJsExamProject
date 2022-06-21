<script>
  import Notifications from 'svelte-notifications';
  import Footer from '../components/Footer.svelte';
  import Navbar from '../components/Navbar.svelte';
</script>

<Notifications>
  <main>
    <Navbar />
    <Footer />
  </main>
</Notifications>

<style>
  :global(body) {
    padding: 0;
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
