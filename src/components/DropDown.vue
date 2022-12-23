<template>
<div @click="toggle">
    <div class="dropdown"><a>Divisions</a><span class="material-symbols-outlined">expand_more</span></div>
    <div :class="{hide: hidden}" class="dropdown__panel">
      <router-link class="dropdown__panel--link" :to="{name:'home'}">Easy     </router-link>
      <router-link class="dropdown__panel--link" :to="{name:'home'}">Medium   </router-link>
      <router-link class="dropdown__panel--link" :to="{name:'home'}">Hard     </router-link>
      <router-link class="dropdown__panel--link" :to="{name:'home'}">Advanced </router-link>
    </div>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'
// <router-link class="header__link" :to="{name:'home'}"><a>Divisions</a><span class="material-symbols-outlined">expand_more</span></router-link>
export default {
  setup()
  {
    const hidden = ref(true)
    const toggle = () => {

      hidden.value = !hidden.value
    }
    return {hidden, toggle}
  }
}
</script>

<style>
.hide {
  opacity: 0;
  pointer-events: none;
}

.dropdown {
  user-select: none;
  cursor: pointer;
  font-family: "open sans";
  text-decoration: none;
  color: white;
  padding: 0 1em;
  height: 100%;
  display: flex;
  align-items: center;
  transition: background-color 0.4s;
}

.dropdown:hover {
  background-color: #1e2933;
  }

.dropdown a {
  font-size: 20px;
}

.dropdown__panel {

  margin-top: 15px;
  margin-left: 0;
  margin-right: 0;
  position:absolute;


  background: blue;
  border-radius: 7.5px;
  display: flex;
  flex-direction: column;
  
  width: 300px;
  transition: opacity 0.2s;
}

.dropdown__panel--link{
  user-select: none;
  text-decoration: none;
  color: white;
  margin: 0;
  padding: 0.2em 0 0.2em 5%;
  border-radius: 7.5px;
  font-size: 20px;
}

.dropdown__panel--link:hover {
  background: black;
}
</style>
