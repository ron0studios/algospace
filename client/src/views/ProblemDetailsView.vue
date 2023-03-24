<template>
  <div class="problem_details">
    <div class="statement" v-if="problem">
      <div class="statement--inner">
        <h1>{{problem.title}}</h1>
        <div v-html="markdown"></div>
      </div>
    </div>
    <div class="submit">
      <codemirror class="editor" v-model="code" />
    </div>
  </div>
</template>

<script>

/*
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

          <button>submit</button>
      </form>
    </div>
*/
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


.cm-editor {
  height: 100%;
}
.cm-scroller { overflow: auto; }

.submit {
  flex: 1;
}


.statement {
  background: lightgray;
  flex: 1;
}

.statement--inner {
  padding: 3em;
}

.problem_details {
    padding-top: 50px;
    display: flex;
    box-sizing: border-box;
    height: 100vh;
}


</style>
