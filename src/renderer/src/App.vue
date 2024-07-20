<script setup lang="ts">
import { MilkdownProvider } from "@milkdown/vue"
import { MilkdownEditor, DragListener, Layout, Banner } from "@renderer/components"
import { useEditorStore, useFilesStore } from "./stores";
import { onUnmounted, ref } from "vue";
import { useIpcRendererOn } from "@vueuse/electron";

const editorStore = useEditorStore();
const filesStore = useFilesStore()
const markdownContent = ref<string>()
// @ts-ignore
useIpcRendererOn(window.electron.ipcRenderer, 'call:fileSave', (event) => {
  console.log("receive onSaveFileCall")
  if (!filesStore.isDirectory && filesStore.tempFiles.length === 0) {
    window.api.saveTempFile({
      name: "untitled.md",
      text: markdownContent.value
    })
  }
  if (filesStore.activeFile) {
    const activeFile = filesStore.activeFile;
    window.api.saveFile({
      ...activeFile,
      text: markdownContent.value
    })
  }
})

onUnmounted(() => {
  filesStore.$reset();
})



</script>

<template>
  <layout>
      <banner #banner></banner>
    <drag-listener>
      <milkdown-provider>
        <milkdown-editor v-model="markdownContent" />
      </milkdown-provider>
    </drag-listener>
  </layout>
</template>
