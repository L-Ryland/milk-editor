<script setup lang="ts">
import { MilkdownProvider, Milkdown, useEditor } from "@milkdown/vue"
import { Editor, rootCtx, defaultValueCtx } from "@milkdown/core";
import { nord } from "@milkdown/theme-nord";
import { commonmark } from "@milkdown/preset-commonmark";
import Versions from './components/Versions.vue'

const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
    <milkdown-provider>
    aa
    <milkdown />
  </milkdown-provider>
  <img alt="logo" class="logo" src="./assets/electron.svg" />
  <h1 text="3xl red-600" class="font-bold underline text-red-600">
      Hello world!
  </h1>
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
    and
    <span class="ts">TypeScript</span>
  </div>
  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
  <div class="actions">
    <div class="action">
      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
    </div>
  </div>
  <Versions />
</template>
