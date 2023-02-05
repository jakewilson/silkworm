import { blankToken, Token, TokenType } from "./token";

export function lex(input: string): Array<Token<TokenType>> {
  return lexBlocks(input)
}

function lexBlocks(input: string): Array<Token<TokenType>> {
  const lines = input.split('\n')

  const header1Re: RegExp = /^#\s*(.*)$/

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    let matches = []

    if (matches = header1Re.exec(line)) {
      return [header1(matches)]
    }
  }

  return []
}

function header1(matches: RegExpExecArray): Token<TokenType.Header1> {
  const token = blankToken<TokenType.Header1>(TokenType.Header1)
  token.block = true

  if (matches.length >= 2) {
    token.content = matches[1]
  }

  return token
}