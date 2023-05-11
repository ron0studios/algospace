<template>
  <div class="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

#app {
  font-family: 'Inter', sans-serif;
}

:root {
  --background-dark: #120e1d;
  --background: #241e33;
  --background-light: #2f234e;
  --primary-0: #301142;
  --primary-1: #670f99;
  --primary-2: #9100e6;
  --primary-3: #3d2b58;
  --primary-4: #523a77;
  --primary-5: #c49dff;
  --highlight: #ffd27d;
  --highlight-dark: #e69f1c;
  --complement-light: #17e678;
  --complement-dark: #08994b;
}

</style>
