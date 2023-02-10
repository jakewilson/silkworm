import { lex } from "../../src/lexer"
import {
  blockquote as blockquote,
  codeblock as code,
  header as h,
  horizontalLine as hr,
  image as img,
  listItem as li,
  orderedList as ol,
  paragraph as p,
  unorderedList as ul,
  Block,
  text,
} from "../../src/token"

test('header 1', () => {
  const expected: Array<Block> = [h({
    content: null,
    tag: 'h1',
    children: [ text({ content: 'Hello' }) ]
  })]
  expect(lex('# Hello')).toStrictEqual(expected)
})
