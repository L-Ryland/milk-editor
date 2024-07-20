<script setup lang="ts">
import { useFilesStore } from '@renderer/stores';

const filesStore = useFilesStore()
</script>

<template>
  <div w-full h="6" bg="black" text="center">
    <div text="white sm">{{ filesStore.activeFile?.name }}</div>
  </div>
</template>
