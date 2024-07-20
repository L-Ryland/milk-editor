<script setup lang="ts">
import { Milkdown, useEditor } from '@milkdown/vue';
import { useEditorStore, useFilesStore } from '@renderer/stores';
import { shallowRef, watch } from 'vue';
import EditorConfig from '@renderer/utils/editorConfig';

interface Props {
  content?: string
}

const markdown =
`# Milkdown Vue Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **Vue**.`
const model = defineModel({ default: markdown })
withDefaults(defineProps<Props>(), {
  content: markdown
})
const editorStore = useEditorStore();
const filesStore = useFilesStore();

const editor = shallowRef<EditorConfig>()
useEditor(root => {
  const _editor = new EditorConfig(root);
  editor.value = _editor
  return _editor.init({
    defaultContent: model.value,
    listener: true,
    handleUpdate(val) {
      if (model.value !== val) {
        model.value = val
      }
    },
  })
})
// const editor = useEditor((root) => {
//   return Editor.make()
//     .config((ctx) => {
//       ctx.set(rootCtx, root)
//       ctx.set(defaultValueCtx, props.content)
//     })
//     .config(nord)
//     .use(commonmark)
// })

watch(() => filesStore.activeFile, () => {
  const content = editorStore.editorContent
  model.value = content;
  editor.value?.updateContent(content)
})


</script>

<template>
  <Milkdown w-screen h-screen />
</template>
