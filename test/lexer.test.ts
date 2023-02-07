import { lex } from "../src/lexer"
import { Token, TokenType } from "../src/token"

test('header 1', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'Hello',
    children: null,
    tag: 'h1',
  }]

  expect(lex('# Hello')).toStrictEqual(expected)
})

test('header 2', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'Hello',
    children: null,
    tag: 'h2',
  }]

  expect(lex('## Hello')).toStrictEqual(expected)
})

test('header 3', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'Hello there mate ##',
    children: null,
    tag: 'h3',
  }]

  expect(lex('### Hello there mate ##')).toStrictEqual(expected)
})

test('header 4', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'Hello there mate ##',
    children: null,
    tag: 'h4',
  }]

  expect(lex('#### Hello there mate ##')).toStrictEqual(expected)
})

test('header 5', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'yo',
    children: null,
    tag: 'h5',
  }]

  expect(lex('#####             yo')).toStrictEqual(expected)
})

test('header 6', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'yo   ',
    children: null,
    tag: 'h6',
  }]

  expect(lex('######          yo   ')).toStrictEqual(expected)
})

test('not a header', () => {
  const expected: Array<Token> = []

  expect(lex('####hi')).toStrictEqual(expected)
})


test('multiple headers', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'header 1',
    children: null,
    tag: 'h1',
  }, {
    type: TokenType.Header,
    block: true,
    content: 'header 2',
    children: null,
    tag: 'h2',
  }, {
    type: TokenType.Header,
    block: true,
    content: 'header 3',
    children: null,
    tag: 'h3',
  }]

  expect(lex('# header 1\n##    header 2\n### header 3')).toStrictEqual(expected)
})

test('hr', () => {
  const expected: Array<Token> = [{
    type: TokenType.HorizontalRule,
    block: true,
    content: null,
    children: null,
    tag: 'hr',
  }]

  expect(lex('---')).toStrictEqual(expected)
})

test('header 1 and hr', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'hi',
    children: null,
    tag: 'h1',
  }, {
    type: TokenType.HorizontalRule,
    block: true,
    content: null,
    children: null,
    tag: 'hr',
  }]

  expect(lex('# hi\n---')).toStrictEqual(expected)
})

test('header 1 and hr and header 2', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'hi',
    children: null,
    tag: 'h1',
  }, {
    type: TokenType.HorizontalRule,
    block: true,
    content: null,
    children: null,
    tag: 'hr',
  }, {
    type: TokenType.Header,
    block: true,
    content: 'nice',
    children: null,
    tag: 'h2',
  }]

  expect(lex('# hi\n---\n## nice')).toStrictEqual(expected)
})

test('ul', () => {
  const expected: Array<Token> = [{
    type: TokenType.UnorderedList,
    block: true,
    content: null,
    children: [{
      type: TokenType.ListItem,
      block: true,
      content: 'hello',
      children: null,
      tag: 'li'
    }],
    tag: 'ul',
  }]

  expect(lex('* hello')).toStrictEqual(expected)
})

test('ul2', () => {
  const expected: Array<Token> = [{
    type: TokenType.UnorderedList,
    block: true,
    content: null,
    children: [{
      type: TokenType.ListItem,
      block: true,
      content: 'hello',
      children: null,
      tag: 'li'
    }, {
      type: TokenType.ListItem,
      block: true,
      // TODO this should break later when I add emphasis
      content: 'hello *again*',
      children: null,
      tag: 'li'
    }],
    tag: 'ul',
  }]

  expect(lex('* hello\n* hello *again*')).toStrictEqual(expected)
})

test('ul4', () => {
  const expected: Array<Token> = [{
    type: TokenType.UnorderedList,
    block: true,
    content: null,
    children: [{
      type: TokenType.ListItem,
      block: true,
      content: 'hello',
      children: null,
      tag: 'li'
    }, {
      type: TokenType.ListItem,
      block: true,
      // TODO this should break later when I add emphasis
      content: 'hello *again*',
      children: null,
      tag: 'li'
    }, {
      type: TokenType.ListItem,
      block: true,
      content: 'yoooo',
      children: null,
      tag: 'li'
    }, {
      type: TokenType.ListItem,
      block: true,
      content: 'what   up',
      children: null,
      tag: 'li'
    }],
    tag: 'ul',
  }]

  expect(lex('* hello\n* hello *again*\n*     yoooo\n* what   up')).toStrictEqual(expected)
})
