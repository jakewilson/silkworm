import { BlockRule } from "../rules"
import { Block, image } from "../token"

export const imageRule: BlockRule = {
  exec: (line): Block | null => {
    const matches = /^\!\[(.*)\]\((.*)\)$/.exec(line)

    if (!matches || matches.length < 3) {
      return null
    }

    return image({
      attrs: {
        alt: matches[1],
        url: matches[2],
      }
    })
  },
}