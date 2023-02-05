import { lex } from "../src/lexer"
import { Token, TokenType } from "../src/token"

test('header 1', () => {
  const expected: Array<Token<TokenType>> = [{
    type: TokenType.Header1,
    block: true,
    content: 'Hello',
    children: null,
  }]

  expect(lex('# Hello')).toStrictEqual(expected)
})