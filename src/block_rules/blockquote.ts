import { BlockRule } from "../rules"
import { blankToken, Token, TokenType } from "../token"

export const blockquote: BlockRule = {
  exec: (inp: string, tokens: Array<Token>): null | Token => {
    const matches = /^\s*>\s+(.*)/.exec(inp)

    if (!matches || matches.length < 2) {
      return null
    }

    const lastToken = tokens.pop()
    const newToken = blankToken(TokenType.Blockquote)
    newToken.block = true
    newToken.content = matches[1]
    newToken.tag = 'blockquote'

    if (!lastToken) {
      return newToken
    } else if (lastToken.type !== TokenType.Blockquote) {
      // put the token we just popped back
      tokens.push(lastToken)

      return newToken
    } else { // last token is a blockquote
      lastToken.content += `\n${newToken.content}`
      return lastToken
    }
  },
}