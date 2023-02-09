export enum TokenType {
  Blockquote,
  Codeblock,
  Header,
  HorizontalRule,
  Image,
  ListItem,
  Paragraph,
  Text,
  UnorderedList,
}

export type Token = {
  type: TokenType
  block: boolean
  children: Array<Token> | null
  content: string | null
  tag: string | null
  attrs: Record<string, string> | null
}

export function blockToken({
  type,
  children = null,
  content = null,
  tag = null,
  attrs = null
}: Pick<Token, "type"> & Partial<Omit<Token, "block" | "type">>): Token {
  return blankToken({
    type,
    block: true,
    children,
    content,
    tag,
    attrs
  })
}

export function blankToken({
  type,
  block = false,
  children = null,
  content = null,
  tag = null,
  attrs = null
}: Pick<Token, "type"> & Partial<Omit<Token, "type">>): Token {
  return {
    type,
    block,
    children,
    content,
    tag,
    attrs
  }
}
