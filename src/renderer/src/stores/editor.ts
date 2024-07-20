import { defineStore } from "pinia";
import { ref } from "vue";

export const useEditorStore = defineStore("editor", () => {
  const editorContent = ref("")

  return {
    editorContent,
    setEditorContent(val: string) {
      editorContent.value = val;
    }
  }
})
