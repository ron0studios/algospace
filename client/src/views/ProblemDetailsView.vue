<template>
  <div class="problem_details">
    <div v-if="problem">
      <h1>{{problem.title}}</h1>

      <p v-for="tag in problem.tags" :key="tag">{{tag}}</p>
    </div>

    <form @submit.prevent="submitForm" class="form">
        <label>Programming language:</label>
        <select required title="programming language" v-model="language">
          <option value="" selected disabled hidden>Choose language</option>
          <option value="cpp20">C++20</option>
          <option value="py3">Python 3</option>
          <option value="js">Javascript</option>
          <option value="c">C11</option>
        </select>
        <label>Code:</label>
        <textarea required v-model="code"></textarea>
        <button>submit</button>
    </form>
  </div>
</template>

<script>
import getProblem from "@/composables/getProblem"
import { ref } from '@vue/reactivity'
import runProgram from '@/judge'

export default {
  props: ['id'],
  setup(props)
  {
    const {problem, load, error} = getProblem(props.id)

    //load()

    const language = ref("");
    const code = ref("");


    const submitForm = async () => {
      runProgram(code.value, language.value)
    }


    return {problem, error, submitForm, language, code}
  }
}
</script>

<style>
.form > * {
  display: block;
}

.problem_details {
    padding-top: 50px;
}


</style>
