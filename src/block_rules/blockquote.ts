import { BlockRule } from "../rules"
import { Block, blockquote, BlockType } from "../token"

export const blockquoteRule: BlockRule = {
  exec: (line, tokens): Block | null => {
    const matches = /^\s*>\s+(.*)/.exec(line)

    if (!matches || matches.length < 2) {
      return null
    }

    const lastToken = tokens.pop()
    const newToken = blockquote({
      content: matches[1],
    })

    if (!lastToken) {
      return newToken
    } else if (lastToken.type !== BlockType.Blockquote) {
      // put the token we just popped back
      tokens.push(lastToken)

      return newToken
    } else { // last token is a blockquote
      lastToken.content += `\n${newToken.content}`
      return lastToken
    }
  },
}