import { BlockRule } from "../rules"
import { headerToken, Token } from "../token"

export const header: BlockRule = {
  exec: (line): null | Token => {
    // headers require a space between the # and the content
    //
    // ###hello  # invalid
    // ### hello # valid
    const matches = /^(#{1,6})\s+(.+)$/.exec(line)

    if (matches && matches.length >= 3) {
      return headerToken({
        content: matches[2],
        tag: `h${matches[1].length}`,
      })
    }

    return null
  },
}