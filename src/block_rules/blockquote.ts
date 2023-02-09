import { BlockRule } from "../rules"
import { blockToken, Token, TokenType } from "../token"

export const blockquote: BlockRule = {
  exec: (line, tokens): null | Token => {
    const matches = /^\s*>\s+(.*)/.exec(line)

    if (!matches || matches.length < 2) {
      return null
    }

    const lastToken = tokens.pop()
    const newToken = blockToken({
      type: TokenType.Blockquote,
      content: matches[1],
      tag: 'blockquote'
    })

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