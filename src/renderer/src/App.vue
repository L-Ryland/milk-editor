<script setup lang="ts">
import { MilkdownProvider } from "@milkdown/vue"
import { MilkdownEditor, DragListener } from "@renderer/components"
import { useEditorStore, useFilesStore } from "./stores";
import { onUnmounted, ref } from "vue";
import { useIpcRendererOn, useIpcRenderer, useIpcRendererInvoke } from "@vueuse/electron";
import { useEventListener } from "@vueuse/core";

const ipcHandle = () => window.electron.ipcRenderer.send('ping')
const editorStore = useEditorStore();
const filesStore = useFilesStore()
const markdownContent = ref<string>()
editorStore.$subscribe((mutation, state) => {
  markdownContent.value = editorStore.editorContent;
})
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
    debugger
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
  <div text="red-500" @click="ipcHandle">aa</div>
  <drag-listener>
    <milkdown-provider>
      <milkdown-editor v-model="markdownContent" />
    </milkdown-provider>
  </drag-listener>
</template>
