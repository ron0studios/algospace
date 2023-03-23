import { h, defineComponent } from 'vue'
import MarkdownIt from 'markdown-it'
import mdk from 'markdown-it-katex'

const VueMarkdown = defineComponent({
  name: 'VueMarkdown',
  props: {
    source: {
      type: String,
      required: true,
    },
    options: {
      type: Object, 
      required: false,
    },
  },
  data() {
    return {
      md: null,
    }
  },
  computed: {
    content() {
      const src = this.source
      return this.md.render(src)
    },
  },
  created() {
    this.md = new MarkdownIt(this.options ?? {}).use(mdk)
  },
  render() {
    return h('div', { innerHTML: this.content })
  },
})

export default VueMarkdown

