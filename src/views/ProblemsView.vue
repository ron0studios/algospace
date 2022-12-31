<template>
<div class="problems">
  <div class="panel__problems--wrapper">
    <div class="filters">
      <div class="filter pill">
        <span class="material-symbols-outlined tuneicon">tune</span>
        filter
      </div>
      <div class="search--wrapper">
        <input class="search" type="text" placeholder="search...">
        <span class="material-symbols-outlined searchicon">search</span>
      </div>
      <div class="tags">

      </div>
    </div>
    <div class="line"></div>
    <div class="panel__problems" v-if="problems.length">
      <ProblemCard  v-for="problem in problems" :key="problem.id" :data="problem"/>

      <!--
      <ProblemCard name="All work no play" difficulty="INSANE"/>
      <ProblemCard name="Block Palindromes" difficulty="EASY"/>
      <ProblemCard name="Window Tiling" difficulty="MEDIUM"/>
      <ProblemCard name="Parking" difficulty="HARD"/>
      <ProblemCard name="Modern Art" difficulty="MEDIUM"/>
      <ProblemCard name="False Plan" difficulty="HARD"/>
      <ProblemCard name="Increasing Passwords" difficulty="INSANE"/>
      <ProblemCard name="String rewriting" difficulty="INSANE"/>
      -->
    </div>
    <LoadingSpinner v-else/>
  </div>
</div>
</template>

<script>
import ProblemCard from "@/components/ProblemCard.vue"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import { useProblemsStore } from "@/store"
import { storeToRefs } from 'pinia'

export default {
  components: { ProblemCard, LoadingSpinner },
  setup()
  {
    const store = useProblemsStore()
    const { problems, error } = storeToRefs(store)
    const { load } = store
    if(error.value)
    {
      load()
    }

    return { problems, error }
  }
}
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 700,
  'GRAD' -25,
  'opsz' 48
}
</style>

<style scoped>
.search {
  width: 200px;
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  text-decoration: none;
  padding: 5px;
}


.search:focus ~ .searchicon {
  display: none;
}

.searchicon {
  margin: 5px;
}

.closeicon {
  margin: 5px;
}

.search--wrapper {
  border: 2px solid rgba(219, 204, 255,0.5);
  border-radius: 10px;
 /* border-bottom: 2px solid rgba(255,255,255,.5);*/
}

.filter {
  color: white;
}

.filters {
  width: 100%;
  max-width: 900px;
  margin: 10px auto;
  display: flex;
  align-items: center;
}

.line {
  border-top: 2px solid #3b3d5c;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.problems {
  height: 100vh;
  box-sizing: border-box;
  padding-top: 50px;
}

.panel__filter {
  display: flex;
  background: blue;
}

.panel__filter__content {
  padding: 25% 1em;
}


.panel__problems {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: 100px;
  gap: 1em;
  padding: 2em;
  padding-top: 1em;
  box-sizing: border-box;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.panel__problems--wrapper {
  overflow: scroll;
  background: rgb(27, 27, 63);
  width: 100%;
  height: 100%;
}

.pill {
    margin-right: 1em;
    padding: 5px 10px;
    cursor: pointer;
    /*border: 2px solid rgb(219, 204, 255);*/
    border-radius: 10px;
}
.pill:hover {
    color: rgb(29, 16, 46);
    background: rgb(219, 204, 255);
    text-decoration: none;
    display: inline-block;
}
.pill:hover .tuneicon{
  color: black;
}
.pill .tuneicon {
  margin-right: 0;
}

</style>