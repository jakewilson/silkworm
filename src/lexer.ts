import { blockRules } from "./rules";
import { blankToken, Token, TokenType } from "./token";

export function lex(input: string): Array<Token<TokenType>> {
  return lexBlocks(input)
}

function lexBlocks(input: string): Array<Token<TokenType>> {
  const lines = input.split('\n')
  const tokens: Array<Token<TokenType>> = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    blockRules.some(rule => {
      const token = rule.exec(line)
      if (token) {
        tokens.push(token)
        return true
      }

      return false
    })
  }

  return tokens
}