import { BlockRule } from "../rules"
import { imageToken, Token, TokenType } from "../token"

export const image: BlockRule = {
  exec: (line): null | Token => {
    const matches = /^\!\[(.*)\]\((.*)\)$/.exec(line)

    if (!matches || matches.length < 3) {
      return null
    }

    return imageToken({
      attrs: {
        alt: matches[1],
        url: matches[2],
      }
    })
  },
}