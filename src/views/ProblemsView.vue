<template>
<div class="problems">
  <div class="panel__filter">
    <div class="panel__filter__content">
      <p>hello</p>
    </div>
  </div>
  <div class="panel__problems">

    <ProblemCard v-for="problem in problems" :key="problem.id" :data="problem"/>

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
</div>
</template>

<script>
import ProblemCard from "@/components/ProblemCard.vue"
import { useProblemsStore } from "@/store"
import { storeToRefs } from 'pinia'

export default {
  components: { ProblemCard },
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

<style>
.problems {
  display:flex;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 50px;
}

.panel__filter {
  display: flex;
  width: 25%;
  height: 100%;
  background: blue;
}

.panel__filter__content {
  padding: 25% 1em;
}


.panel__problems {
  overflow: scroll;
  width: 75%;
  height: 100%;
  background: rgb(27, 27, 63);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  gap: 2em;

  padding: 2em;
  box-sizing: border-box;
}

</style>