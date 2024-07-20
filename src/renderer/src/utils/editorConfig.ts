import { defaultValueCtx, Editor, rootCtx, serializerCtx } from "@milkdown/core";
import type { Ctx } from "@milkdown/ctx";
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { commonmark } from "@milkdown/preset-commonmark";
import { nord } from "@milkdown/theme-nord";
import { history } from '@milkdown/plugin-history';
import { prism } from "@milkdown/plugin-prism";
import { diagram } from "@milkdown/plugin-diagram";
import { isNil } from "lodash-es";

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
  history: boolean;
}
export default class EditorConfig {
  #root: HTMLDivElement;
  #editor: Editor;
  #theme = "nord" as const;
  #commonmark: boolean = true;
  #history: boolean = true;
  #listener: boolean = true;
  #prism: boolean = true;
  #diagram: boolean = true;

  constructor(root: HTMLDivElement) {
    this.#root = root;
    this.#editor = Editor.make();
  }

  set history(val: boolean) {
    if (!this.#editor) return;
    if (val)
      this.#editor.use(history);
    else
      this.#editor.remove(history);
    this.#history = val;
  }

  set listener(val: boolean) {
    if (!this.#editor) return;
    if (val)
      this.#editor.use(listener);
    else
      this.#editor.remove(listener);
  }

  set commonmark(val: boolean) {
    if (!this.#editor) return;
    if (val)
      this.#editor.use(commonmark);
    else
      this.#editor.remove(commonmark);
    this.#commonmark = val;
  }

  set prism(val: boolean) {
    if (!this.#editor) return;
    if (val)
      this.#editor.use(prism);
    else
      this.#editor.remove(prism);
    this.#prism = val;
  }

  set diagram(val: boolean) {
    if (!this.#editor) return;
    if (val)
      this.#editor.use(diagram);
    else
      this.#editor.remove(diagram);
    this.#diagram = val;
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
    this.loadConfig(payload);
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

  loadConfig({ history, listener }: Partial<EditorPluginState>) {
    if (!isNil(history))
      this.#history = history;
    if (!isNil(listener))
      this.#listener = listener;
  }

  load(payload: Partial<EditorPluginState>) {
    const editor = this.#editor;
    if (this.#history) {
      editor.use(history);
    }
    if (this.#listener) {
      editor.config(this.#listenerConfig(payload.handleUpdate)).use(listener);
    }
    if (this.#prism)
      editor.use(prism);
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
