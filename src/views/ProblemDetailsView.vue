<template>
  <div class="problem_details">
    <div v-if="problem">
      <h1>{{problem.title}}</h1>

      <p v-for="tag in problem.tags" :key="tag">{{tag}}</p>
    </div>
  </div>
</template>

<script>
import getProblem from "@/composables/getProblem"

export default {
  props: ['id'],
  setup(props)
  {
    const {problem, load, error} = getProblem(props.id)
    load()

    return {problem, error}
  }
}
</script>

<style>
.problem_details {
    padding-top: 50px;
}


</style>
