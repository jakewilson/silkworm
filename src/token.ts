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
  attrs: object | null
}

export function blankToken(t: TokenType): Token {
  return {
    block: false,
    type: t,
    content: null,
    children: null,
    tag: null,
    attrs: null,
  }
}