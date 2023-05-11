import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { basicSetup } from "codemirror";
import VueCodemirror from "vue-codemirror";

import { createPinia } from "pinia";
import './assets/fonts/font.css'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(VueCodemirror, {
    // optional default global options
    autofocus: true,
    disabled: false,
    indentWithTab: true,
    tabSize: 2,
    placeholder: "Code goes here...",
    extensions: [basicSetup],
    // ...
  })
  .mount("#app");
