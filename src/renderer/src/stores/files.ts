import { defineStore } from "pinia";
import { json } from "stream/consumers";
import { ref } from "vue";

export const useFilesStore = defineStore("files", () => {
  const tempFiles: Array<FilePayload> = JSON.parse(localStorage.getItem("files") || "[]");
  const activeFile = ref<FilePayload>();
  const setActiveFile = (file: FilePayload) => activeFile.value = file;
  const addFile = (file: FilePayload) => {
    tempFiles.push(file);
    localStorage.setItem("files", JSON.stringify(tempFiles));
  };

  const isDirectory = ref(false);
  const setIsDirectory = (val: boolean) => isDirectory.value = val;

  const $reset = () => {
    localStorage.clear();
  };
  return { tempFiles, addFile, isDirectory, setIsDirectory, activeFile, setActiveFile, $reset };
});
