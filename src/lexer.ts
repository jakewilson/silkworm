import { blockRules } from "./rules";
import { blankToken, Token, TokenType } from "./token";

export function lex(input: string): Array<Token> {
  return lexBlocks(input)
}

function lexBlocks(input: string): Array<Token> {
  const lines = input.split('\n')
  const tokens: Array<Token> = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    blockRules.some(rule => {
      const token = rule.exec(line, tokens)
      if (token) {
        tokens.push(token)
        return true
      }

      return false
    })
  }

  return tokens
}