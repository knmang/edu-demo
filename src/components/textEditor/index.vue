<template>
  <div ref="editor"></div>
</template>

<script>
import E from 'wangeditor'

export default {
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor)
      editor.config.onchange = value => {
        this.$emit('input', value)
      }
      editor.create()
      editor.txt.html(this.value)
    }
  }
}
</script>
