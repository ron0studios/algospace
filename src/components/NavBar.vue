<template>
  <div class="header">
    <div class="header__content">
      <div class="header--left">
        <router-link class="header__logo" :to="{name:'home'}">
          <img class="header__logo--image" :src="algospace_white">
        </router-link>
        <div class="bar"></div>
        <DropDown />
        <router-link class="header__link" :to="{name:'problems'}"><a>Problems</a></router-link>
      </div>
      <div class="header--right">
        <div class="searchbar"> <span class="material-symbols-outlined">search</span>search here... </div>
        <div class="bar"></div>
        <router-link class="header__logo" :to="{name: 'home'}">
          <img class="header__logo--image userlogo" :src="testuserlogo">
        </router-link>
      </div>
      <!-- <router-link class="header__search" :to="{name:'home'}">Search</router-link> -->
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import DropDown from '@/components/DropDown.vue'

export default {
  components: {DropDown},
  setup()
  {
    const algospace_white = ref('./src/assets/algospace_white.png')
    const testuserlogo = ref('./src/assets/testuserlogo.png')
    return {algospace_white, testuserlogo}
  }
}
</script>


<style>
body {
  margin: 0;
  padding: 0;
  /*padding-top: 50px;*/
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.header__content {
  margin: 0 auto;
  width: 1400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
}

.header {
  z-index: 10;
  position: fixed;
  top: 0;
  width: 100%;
  margin: auto;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  background-color: #2c3e50;
  height: 50px;

}

.header--left {
  display: flex;
  justify-content: space-between;
}

.header--right {
  display: flex;
  justify-content: space-between;
}

.header__logo {
  display: flex;
  align-items: center;
}

.header__logo--image {
  height: 30px;
  width: auto;
  padding: 7.5px;
}

.header__link {
  font-family: "open sans";
  text-decoration: none;
  color: white;
  padding: 0 1em;
  height: 100%;
  display: flex;
  align-items: center;
  transition: background-color 0.4s;
}

.header__link:hover {
  background-color: #1e2933;
  }

.header__link a {
  font-size: 20px;
}

.bar {
  border-left: 2px solid #5e7891;
  margin: auto 0;
  height: 50%;
}

.userlogo {
  border-radius: 100%;
  height: 35px;
  padding: 3.5px 1em;
}

.searchbar {
  max-height: 35px;
  font-size: 17.5px;
  width: 300px;
  background: #1e2933;
  margin: auto 1em;
  padding: 7.5px;
  border-radius: 15px;
  color: #88a
  }
  .searchbar span {
    text-align: center;
  }

</style>

<style>
.material-symbols-outlined {
  color: white;
  font-size: 21px;
  margin-right: 0.5em;
  vertical-align: middle;
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}
</style>
