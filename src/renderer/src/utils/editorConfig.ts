import { defaultValueCtx, Editor, rootCtx, serializerCtx } from "@milkdown/core";
import type { Ctx } from "@milkdown/ctx";
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { commonmark } from "@milkdown/preset-commonmark";
import { nord } from "@milkdown/theme-nord";
import type { Ref } from "vue";

export const listenerConfig = (ctx: Ctx) => {
  const listener = ctx.get(listenerCtx);
  listener.updated((ctx, doc, _prevDoc) => {
    // const editorView = ctx.get(editorViewCtx);
    const serializer = ctx.get(serializerCtx);
    let output = doc.toString();
    let _2 = doc.toJSON();
    const _3 = serializer(doc);
    debugger;
  });
};

interface EditorPluginState {
  listener: boolean;
  defaultContent: string;
  handleUpdate(val: any): void;
}
export default class EditorConfig {
  #root: HTMLDivElement;
  #editor: Editor;
  #theme = "nord" as const;
  #commonmark: boolean = true;

  constructor(root: HTMLDivElement) {
    this.#root = root;
    this.#editor = Editor.make();
  }

  #listenerConfig(cb?: (val: any) => void) {
    return (ctx: Ctx) => {
      const listener = ctx.get(listenerCtx);
      listener.updated((ctx, doc, _prevDoc) => {
        const serializer = ctx.get(serializerCtx);
        cb?.(serializer(doc));
      });
    };
  }

  init(payload: Partial<EditorPluginState>): Editor {
    const root = this.#root;
    const editor = this.#editor.config(ctx => {
      ctx.set(rootCtx, root);
    });
    if (this.#commonmark) {
      editor.use(commonmark);
    }
    if (this.#theme === "nord") {
      editor.config(nord);
    }
    this.#editor = this.load(payload);
    return editor;
  }

  load(payload: Partial<EditorPluginState>) {
    const editor = this.#editor;
    if (payload.listener) {
      editor.config(this.#listenerConfig(payload.handleUpdate)).use(listener);
    }
    if (payload.defaultContent) {
      editor.config(ctx => {
        ctx.set(defaultValueCtx, payload.defaultContent!);
      });
    }
    return this.#editor;
  }

  config(payload: Partial<EditorPluginState>) {
    const editor = this.#editor;
    if (payload.listener) {
      editor.config(listenerConfig).use(listener);
    }
    if (payload.defaultContent) {
      editor.config(ctx => {
        ctx.set(defaultValueCtx, payload.defaultContent!);
      });
    }
    this.#editor.create();
    return this.#editor;
  }

  async updateContent(val: any) {
    const editor = this.#editor;
    await editor.destroy();
    editor.config(ctx => {
      ctx.set(defaultValueCtx, val);
    });
    editor.create();
  }
}
