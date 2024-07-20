// uno.config.ts
import { defineConfig, presetAttributify, presetUno, presetWind, transformerDirectives } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  presets: [presetWind(), presetAttributify()],
  transformers: [transformerDirectives()]
})
