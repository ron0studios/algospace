<template>
  <div class="problem_details">
    <div class="statement" v-if="problem">
      <h1>{{problem.title}}</h1>

      <p class="tags" v-for="tag in problem.tags" :key="tag">{{tag}}</p>

      <div v-html="markdown"></div>


    </div>

    <div class="submit">
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
          <!-- <textarea required v-model="code"></textarea> -->
          <codemirror v-model="code"/>
          <button>submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import getProblem from "@/composables/getProblem"
import { ref } from '@vue/reactivity'
import runProgram from '@/judge'
import { marked } from 'marked'
import markedKatex from 'marked-katex-extension'
import 'katex/dist/katex.css'
import { computed } from "vue"


export default {
  props: ['id'],
  setup(props)
  {
    const {problem, load, error} = getProblem(props.id)

    load().then(()=>{
      //problem.value.content.replaceAll("\\n","\n")
    })



    marked.use(markedKatex({}))

    const markdown = computed(()=>{return marked(problem.value.content.replaceAll('\\n','\n'), {})})


    const language = ref("");
    const code = ref("");

    const submitForm = async () => {
      runProgram(code.value, language.value)
    }


    return {problem, error, submitForm, language, code, markdown}
  }
}
</script>

<style>

.submit {
  margin: 0 auto;
  width: 70%;
  display: flex;
}

.statement {
  margin: 0 auto;
  width: 70%;
}


.form label {
  font-size: 24px;
  font-weight: "bold";
}

.form > * {
  display: block;
}

.problem_details {
    padding-top: 50px;
}


</style>
