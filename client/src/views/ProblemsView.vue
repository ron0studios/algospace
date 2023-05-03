<template>
  <div class="problems">
    <div class="panel__problems--wrapper">
    <div class="hero">
      <div class="typewriter">
        <h1>Problems</h1>
      </div>
      <div class="subtitle">
        Explore the catalogue of programming questions
      </div>
    </div>
      <div class="pickers">
        <div class="card">
          <div class="icon">
            <img src="../assets/dice-five-solid.svg" alt="dice" />
          </div>
          <p>random problem</p>
        </div>
        <div class="card">
          <div class="icon">
            <img src="../assets/skull-solid.svg" alt="skull" />
          </div>
          <p>weekly problem</p>
          <div class="timer">6d 23h 30m</div>
        </div>
        <div class="card">
          <div class="icon">
            <img src="../assets/cubes-solid.svg" alt="cubes" />
          </div>
          <p>more resources</p>
        </div>
      </div>
      <div class="filters">
        <div class="filter pill">
          <span class="material-symbols-outlined tuneicon">tune</span>
          filter
        </div>
        <form class="search--wrapper" @submit.prevent="search">
          <span class="material-symbols-outlined searchicon" >search</span>
          <input class="search" type="text" placeholder="search..." v-model="searchData"/>
        </form>
        <div class="pagineate">
          <button class="pagination--button pagechange" @click="left">&lt;</button>
          <div class="pagination--array">
            <span @click="jump(x)" v-for="x in tot_pages" :key="x" class="pagination--button" :class="page === x ? 'highlight' : 'light-theme'">{{ x }}</span>
          </div>
          <button class="pagination--button pagechange" @click="right">></button>
        </div>
        <div class="tags"></div>
      </div>
      <div class="line"></div>
      <div class="panel__problems" v-if="problems.length">
        <ProblemCard
          v-for="problem in problems"
          :key="problem.id"
          :data="problem"
        />
      </div>
      <LoadingSpinner v-else />
    </div>
  </div>
</template>

<script>
import ProblemCard from "@/components/ProblemCard.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useProblemsStore } from "@/store";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export default {
  components: { ProblemCard, LoadingSpinner },
  setup() {
    const store = useProblemsStore();
    const { problems, error, page, tot_pages } = storeToRefs(store);
    const { load, left, right, jump } = store;
    const searchData = ref("")
    if (error.value) {
      load();
    }

    const search = () => {
      console.log(searchData.value)
      const string = [...searchData.value].map(x => x+'%').join('')
      console.log(string)
      load("",'title ~ "%'+string+'"')
    }


    return { problems, error, left, right, page, search, searchData, tot_pages, jump};
  },
};
</script>

<style>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 700, "GRAD" -25, "opsz" 48;
}
</style>

<style scoped>
.hero {
  height: 20vh;
  width: 100%;
  background: var(--background-dark);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero h1 {
  font-family: "Courier New", Courier, monospace;
  font-size: 4vw;
  color: white;
  margin: 0.8vw;
}

.subtitle {
  font-family: "Courier New", Courier, monospace;
  font-size: 1vw;
  color: var(--complement-dark);
  display: block;
  width: 1000px;
  text-align: center;
}

.highlight {
  background: var(--highlight) !important;
}

.pagination--button:hover:not(.highlight) {
  background: var(--complement-light) !important;
}
.pagination--button:hover.highlight{
  background: var(--highlight-dark) !important;
}
.pagination--button:hover.pagechange{
  background: var(--complement-dark) !important;
}


.problems .pagination--button {
  border-style: none;
  padding: 0.2vw 0.5vw;
  cursor: pointer;
  color: var(--background);
  background: var(--complement-dark);
  border-radius: 10px;
  display: inline-block;
  font-weight: 900;
}

.problems .pagechange {
  background: var(--complement-light);
}
.pagination--array {
  display: inline-flex;
  gap: 0.5vw;
  margin: auto 0.5vw;
}
.count {
  margin: auto 1vw;
  color: white;
  font-weight: bold;
}

.problems .pagineate {
}

.problems .card .timer {
  position: absolute;
  bottom: -0.5vw;
  left: 1.5vw;
  font-size: 0.6vw;
  color: rgb(0, 0, 0);
  font-weight: bold;
  background: skyblue;
  border: solid 0.2em rgb(29, 16, 46);
  box-shadow: 0px 0px 0px 0.2em rgb(29, 16, 46);
  border-radius: 10px;
  padding: 5px;
}

.problems .card:hover {
  background: var(--highlight-dark); /*rgb(219, 204, 255);*/
}

.problems .card:hover > p {
  color: rgb(29, 16, 46);
}

.problems .card > p {
  font-size: 1vw;
  font-weight: 700;
  color: var(--background);
}

.problems .card > .icon {
  box-sizing: border-box;
  width: 50%;
  height: 50%;
  margin-top: 10%;
  display: flex;
}

.icon > img {
  align-self: flex-end;
  filter: invert(9%) sepia(13%) saturate(3783%) hue-rotate(230deg)
    brightness(91%) contrast(101%);
}

.pickers {
  width: 100%;
  max-width: 35vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.pickers .card {
  cursor: pointer;
  width: calc(100% / 3);
  aspect-ratio: 1 / 1;
  background: var(--highlight); /*#2e296b; */
  margin: 15px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.search {
  width: 10vw;
  background-color: transparent;
  border: none;
  outline: none;
  color: color(--background);
  text-decoration: none;

  box-sizing: border-box;
  font-weight: 500;
}

.search--wrapper {
  margin-right: 1em;
  padding: 5px 10px;
  cursor: pointer;
  background: var(--complement-light); /*rgb(71, 13, 146); rgb(29, 16, 46);*/
  border-radius: 10px;
  display: inline-block;
}

.searchicon {
  box-sizing: border-box;
  color: var(--background);
}

.closeicon {
  margin: 5px;
  box-sizing: border-box;
}

/*
.search--wrapper {
  border-bottom: 2px solid rgba(255,255,255,.5);
}
*/

.filter {
  color: white;
}

.filters {
  width: 100%;
  max-width: 35vw;
  margin: 0.5vw auto;
  display: flex;
  align-items: center;
}

.line {
  border-top: 2px solid #3b3d5c;
  width: 100%;
  max-width: 35vw;
  margin: 0 auto;
}

.problems {
  height: 100vh;
  box-sizing: border-box;
  padding-top: 50px;
}

.panel__problems {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: max(100px, 6vw);
  gap: 1em;
  padding: 2em;
  padding-top: 1em;
  box-sizing: border-box;
  width: 100%;
  max-width: 35vw;
  margin: 0 auto;
}


.panel__problems--wrapper {
  overflow: scroll;
  background: var(--background); /*rgb(29, 16, 46); */
  width: 100%;
  height: 100%;
}

.pill {
  margin-right: 1em;
  padding: 5px 0.5vw;
  cursor: pointer;
  color: var(--background);
  background: var(--complement-light);
  border-radius: 10px;
  display: inline-block;
  font-weight: 600;
}

.pill .tuneicon {
  color: black;
}

.pill:hover {
  background: var(--highlight);
  text-decoration: none;
}
.pill:hover .tuneicon {
  color: black;
}
.pill .tuneicon {
  margin-right: 0;
}
</style>
