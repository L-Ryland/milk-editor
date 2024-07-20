<script lang="ts" setup>
import { useFilesStore, useEditorStore } from '@renderer/stores';

const filesStore = useFilesStore();
const editorStore = useEditorStore();
const handleReceiveDroppedFile = async (e: DragEvent) => {
  const [file] = e.dataTransfer?.files ?? [];
  debugger
  if (!file.type) {
    return filesStore.setIsDirectory(true);
  }
  if (file.type !== "text/markdown") {
    return alert("invalid type!")
  } else {
    const activeFile = {
      path: file.path,
      name: file.name,
      type: file.type
    }
    filesStore.setActiveFile(activeFile)
    filesStore.addFile(activeFile);
    const data = await window.api.openFile(activeFile)
    editorStore.setEditorContent(data);
  }
}

</script>

<template>
  <div w-screen h-screen absolute draggable @dragover.prevent="" @drop.prevent="handleReceiveDroppedFile">
    <slot></slot>
  </div>
</template>
