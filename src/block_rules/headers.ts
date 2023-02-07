import { BlockRule } from "../rules"
import { blankToken, Token, TokenType } from "../token"

export const header: BlockRule = {
  exec: (inp: string): null | Token => {
    // headers require a space between the # and the content
    //
    // ###hello  # invalid
    // ### hello # valid
    const matches = /^(#{1,6})\s+(.+)$/.exec(inp)

    if (matches && matches.length >= 3) {
      const token = blankToken(TokenType.Header)
      token.block = true
      token.content = matches[2]
      token.tag = `h${matches[1].length}`
      return token
    }

    return null
  },
}