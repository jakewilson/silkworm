import { BlockRule } from "../rules"
import { blankToken, blockToken, Token, TokenType } from "../token"

export const image: BlockRule = {
  exec: (line): null | Token => {
    const matches = /^\!\[(.*)\]\((.*)\)$/.exec(line)

    if (!matches || matches.length < 3) {
      return null
    }

    return blockToken({
      type: TokenType.Image,
      attrs: {
        alt: matches[1],
        url: matches[2],
      },
      tag: 'img',
    })
  },
}