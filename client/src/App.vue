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
#app {
  font-family: Cantarell, Avenir, Arial, sans-serif;
}
:root {
  --background: #241e33;
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
