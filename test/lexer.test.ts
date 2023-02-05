import { lex } from "../src/lexer"
import { Token, TokenType } from "../src/token"

test('header 1', () => {
  const expected: Array<Token<TokenType>> = [{
    type: TokenType.Header,
    block: true,
    content: 'Hello',
    children: null,
    tag: 'h1',
  }]

  expect(lex('# Hello')).toStrictEqual(expected)
})

test('header 2', () => {
  const expected: Array<Token<TokenType>> = [{
    type: TokenType.Header,
    block: true,
    content: 'Hello',
    children: null,
    tag: 'h2',
  }]

  expect(lex('## Hello')).toStrictEqual(expected)
})

test('header 3', () => {
  const expected: Array<Token<TokenType>> = [{
    type: TokenType.Header,
    block: true,
    content: 'Hello there mate ##',
    children: null,
    tag: 'h3',
  }]

  expect(lex('### Hello there mate ##')).toStrictEqual(expected)
})

test('header 4', () => {
  const expected: Array<Token<TokenType>> = [{
    type: TokenType.Header,
    block: true,
    content: 'Hello there mate ##',
    children: null,
    tag: 'h4',
  }]

  expect(lex('#### Hello there mate ##')).toStrictEqual(expected)
})

test('header 5', () => {
  const expected: Array<Token<TokenType>> = [{
    type: TokenType.Header,
    block: true,
    content: 'yo',
    children: null,
    tag: 'h5',
  }]

  expect(lex('#####             yo')).toStrictEqual(expected)
})

test('header 6', () => {
  const expected: Array<Token<TokenType>> = [{
    type: TokenType.Header,
    block: true,
    content: 'yo   ',
    children: null,
    tag: 'h6',
  }]

  expect(lex('######          yo   ')).toStrictEqual(expected)
})