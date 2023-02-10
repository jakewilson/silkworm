export enum BlockType {
  Blockquote,
  Codeblock,
  Header,
  HorizontalLine,
  Image,
  ListItem,
  OrderedList,
  Paragraph,
  Text,
  UnorderedList,
}

export type Token = Block | Inline

export type Block = {
  type: BlockType
  children: Array<Token> | null
  content: string | null
  tag: string | null
  attrs: Record<string, string> | null
}

type BlockFuncProps = Partial<Omit<Block, "tag" | "type">>

// tag is required here
export function header(
  props: Pick<Block, "tag"> & Omit<Partial<Block>, "type">
) {
  return block({
    type: BlockType.Header,
    ...props,
  })
}

export function blockquote(props?: BlockFuncProps) {
  return block({
    type: BlockType.Blockquote,
    tag: "blockquote",
    ...props,
  })
}

export function codeblock(props?: BlockFuncProps) {
  return block({
    type: BlockType.Codeblock,
    tag: "code",
    ...props,
  })
}

export function horizontalLine(props?: BlockFuncProps) {
  return block({
    type: BlockType.HorizontalLine,
    tag: "hr",
    ...props,
  })
}

export function paragraph(props?: BlockFuncProps) {
  return block({
    type: BlockType.Paragraph,
    tag: "p",
    ...props,
  })
}

export function listItem(props?: BlockFuncProps) {
  return block({
    type: BlockType.ListItem,
    tag: "li",
    ...props,
  })
}

export function unorderedList(props?: BlockFuncProps) {
  return block({
    type: BlockType.UnorderedList,
    tag: "ul",
    ...props,
  })
}

export function orderedList(props?: BlockFuncProps) {
  return block({
    type: BlockType.OrderedList,
    tag: "ol",
    ...props,
  })
}

export function image(props?: BlockFuncProps) {
  return block({
    type: BlockType.Image,
    tag: "img",
    ...props,
  })
}

export function block({
  type,
  children = null,
  content = null,
  tag = null,
  attrs = null
}: Pick<Block, "type"> & Partial<Block>): Block {
  return {
    type,
    children,
    content,
    tag,
    attrs
  }
}

export enum InlineType {
  Bold,
  Emphasis,
  Text,
}

export type Inline = {
  type: InlineType
  content: string
  tag: string | null
  attrs: Record<string, string> | null
}

type InlineFuncProps =
  /* content is required */
  Pick<Inline, "content"> &
  Partial<Omit<Inline, "content" | "tag" | "type">>

export function bold(props: InlineFuncProps): Inline {
  return inline({
    type: InlineType.Bold,
    tag: "strong",
    ...props,
  })
}

export function emphasis(props: InlineFuncProps): Inline {
  return inline({
    type: InlineType.Emphasis,
    tag: "em",
    ...props,
  })
}

export function text(props: InlineFuncProps): Inline {
  return inline({
    type: InlineType.Text,
    tag: "",
    ...props,
  })
}

export function inline({
  type,
  content,
  tag = null,
  attrs = null
}: Pick<Inline, "type" | "content"> & Partial<Omit<Inline, "type" | "content">>): Inline {
  return {
    type,
    content,
    tag,
    attrs,
  }
}