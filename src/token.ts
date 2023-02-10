export enum TokenType {
  Blockquote,
  Codeblock,
  Header,
  HorizontalRule,
  Image,
  ListItem,
  OrderedList,
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

type TokenFuncProps = Omit<Partial<Token>, "block" | "tag" | "type">

// tag is required here
export function headerToken(
  props: Pick<Token, "tag"> & Omit<Partial<Token>, "block" | "type">
) {
  return blockToken({
    type: TokenType.Header,
    ...props,
  })
}

export function blockquoteToken(props?: TokenFuncProps) {
  return blockToken({
    type: TokenType.Blockquote,
    tag: "blockquote",
    ...props,
  })
}

export function codeblockToken(props?: TokenFuncProps) {
  return blockToken({
    type: TokenType.Codeblock,
    tag: "code",
    ...props,
  })
}

export function horizontalRuleToken(props?: TokenFuncProps) {
  return blockToken({
    type: TokenType.HorizontalRule,
    tag: "hr",
    ...props,
  })
}

export function paragraphToken(props?: TokenFuncProps) {
  return blockToken({
    type: TokenType.Paragraph,
    tag: "p",
    ...props,
  })
}

export function listItemToken(props?: TokenFuncProps) {
  return blockToken({
    type: TokenType.ListItem,
    tag: "li",
    ...props,
  })
}

export function unorderedListToken(props?: TokenFuncProps) {
  return blockToken({
    type: TokenType.UnorderedList,
    tag: "ul",
    ...props,
  })
}

export function orderedListToken(props?: TokenFuncProps) {
  return blockToken({
    type: TokenType.OrderedList,
    tag: "ol",
    ...props,
  })
}

export function imageToken(props?: TokenFuncProps) {
  return blockToken({
    type: TokenType.Image,
    tag: "img",
    ...props,
  })
}

export function blockToken({
  type,
  children = null,
  content = null,
  tag = null,
  attrs = null
}: Pick<Token, "type"> & Omit<Partial<Token>, "block" | "type">): Token {
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
}: Pick<Token, "type"> & Partial<Token>): Token {
  return {
    type,
    block,
    children,
    content,
    tag,
    attrs
  }
}
