import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { basicSetup } from "codemirror";
import VueCodemirror from "vue-codemirror";

import { createPinia } from "pinia";

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
