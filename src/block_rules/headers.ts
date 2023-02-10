import { BlockRule } from "../rules"
import { Block, header } from "../token"

export const headerRule: BlockRule = {
  exec: (line): Block | null => {
    // headers require a space between the # and the content
    //
    // ###hello  # invalid
    // ### hello # valid
    const matches = /^(#{1,6})\s+(.+)$/.exec(line)

    if (matches && matches.length >= 3) {
      return header({
        content: matches[2],
        tag: `h${matches[1].length}`,
      })
    }

    return null
  },
}