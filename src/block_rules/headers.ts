import { BlockRule } from "../rules"
import { blankToken, Token, TokenType } from "../token"

export const header: BlockRule = {
  exec: (inp: string): null | Token<TokenType.Header> => {
    let content = ''
    let level = 6

    for (; level >= 1; level--) {
      const matches = headerRe(level as HeaderLevel).exec(inp)

      if (matches && matches.length >= 2) {
        content = matches[1]
        break
      }
    }

    if (content) {
      const token = blankToken(TokenType.Header)
      token.block = true
      token.content = content
      token.tag = `h${level}`
      return token
    }

    return null
  },
}

export type HeaderLevel = 1 | 2 | 3 | 4 | 5 | 6

function headerRe(level: HeaderLevel): RegExp {
  let headerStr = '#'

  for (let i = 2; i <= level; i++) {
    headerStr += '#'
  }

  return new RegExp(`^${headerStr}\\s*(.*)$`)
}