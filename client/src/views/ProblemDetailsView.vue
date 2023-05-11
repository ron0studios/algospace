<template>
  <div class="problem_details">
    <div class="statement" v-if="problem">
      <div class="statement--inner">
        <h1>{{ problem.title }}</h1>
        <div v-html="markdown"></div>
      </div>
      <div class="results">
        <h1>
          results:
        </h1>
        <p v-if="loading">loading...</p>
        <div class="results__table">
          <div v-for="index in problem.testcase.input.length" :key="index" class="testcase" :class="submission[index-1]">{{(submission[index-1]) ? submission[index-1] : index}}</div>
        </div>
      </div>
    </div>
    <div class="submit">
      <div class="buttons">
        <button @click="submitForm">
          <BoltIcon style="height: 30px" />
          submit
        </button>
        <select
          required
          title="programming language"
          v-model="language"
          @change="updateLanguage"
        >
          <option value="" selected disabled hidden>Choose language</option>
          <option value="cpp20">C++20</option>
          <option value="py3">Python 3</option>
          <option value="js">Javascript</option>
        </select>
        <ToggleDarkLight @click="toggleTheme" />
      </div>
      <codemirror class="editor" v-model="code" :extensions="extensions" />
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
import getProblem from "@/composables/getProblem";
import { ref } from "vue";
import runProgram from "@/judge";
import { marked } from "marked";
import markedKatex from "marked-katex-extension";
import "katex/dist/katex.css";
import { computed } from "vue";
import { BoltIcon } from "@heroicons/vue/24/solid";
import ToggleDarkLight from "../components/ToggleDarkLight.vue";

import { dracula } from "@uiw/codemirror-theme-dracula";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";

export default {
  props: ["id"],
  components: {
    BoltIcon,
    ToggleDarkLight,
  },
  setup(props) {
    const { problem, load, error } = getProblem(props.id);
    const submission = ref([])
    const loading = ref(false)

    const extensions = ref([dracula, python()]);

    load().then(() => {
      //problem.value.content.replaceAll("\\n","\n")
    });

    marked.use(markedKatex({}));

    const markdown = computed(() => {
      return marked(problem.value.statement.replaceAll("\\n", "\n"), {});
    });

    const language = ref("py3");
    const code = ref("");

    const updateLanguage = (event) => {
      switch (event.target.value) {
        case "py3":
          extensions.value = [dracula, python()];
          break;
        case "cpp20":
          extensions.value = [dracula, cpp()];
          break;
        case "js":
          extensions.value = [dracula, javascript()];
          break;
        default:
          console.log("unsupported language");
          break;
      }
    };

    const submitForm = async () => {
      console.log(code.value);
      loading.value = true
      const out = await runProgram(
        code.value,
        language.value,
        [...problem.value.testcase.input],
        [...problem.value.testcase.output]
      )

      submission.value = out.output

      loading.value=false;

    };

    const toggleTheme = () => {
      if (extensions.value.length == 2) {
        extensions.value = [extensions.value[1]];
      } else {
        extensions.value = [dracula, extensions.value[0]];
      }
    };

    return {
      problem,
      error,
      submitForm,
      language,
      code,
      markdown,
      extensions,
      updateLanguage,
      toggleTheme,
      submission,
      loading
    };
  },
};
</script>

<style>
.statement--inner h1:after {
  content: " ";
  display: block;
  border: 2px solid lightgray;
}

.statement--inner pre {
  background: lightgray;
  padding: 0.5em;
  padding-left: 2em;
  border-radius: 10px;
}

.buttons > button {
  border: none;
  display: flex;
  align-items: center;
}

.buttons {
  height: 50px;
  background-color: #212330;
  display: flex;
  gap: 10px;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.cm-editor {
  height: calc(100% - 64px); /*bad solution*/
  font-size: 14px;
}
.cm-scroller {
  overflow: auto;
}

.submit {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.results {
  margin: 2em;
  padding: 1em;
  border-radius: 0.5em;
  background: whitesmoke;
}

.results__table {
  margin: 0.5em;
  display: flex;
  justify-content: left;
  gap: 10px;
}

.testcase {
  background-color: lightgray;
  width: 50px;
  height: 70px;
  text-align: center;
  border-top: solid 10px black;
  display: flex;
  flex-direction: column;
  justify-content: center;

  font-weight: 800;
  font-size: 24px;
  color: darkgray;
}

.testcase.AC {
  background: limegreen;
  color: white;
}

.testcase.CE {
  background: orange;
  color: white;
}

.testcase.RE {
  background: orange;
  color: white;
}

.testcase.TLE {
  background: orange;
  color: white;
}

.testcase.WA {
  background: orangered;
  color: white;
}


.statement {
  background: white;
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.statement--inner {
  margin: 2em;
  padding: 1em;
  border-radius: 0.5em;
  font-weight: 500;
  font-size: 18px;
  background: whitesmoke;
}

.problem_details {
  padding-top: 50px;
  display: flex;
  box-sizing: border-box;
  height: 100vh;
}
</style>
