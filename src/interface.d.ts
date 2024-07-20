interface FilePayload extends Partial<Pick<File, "name" | "path" | "type">> {
  text?: string
}
