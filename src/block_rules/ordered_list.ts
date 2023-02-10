import { BlockRule } from "../rules";
import { listItem, orderedList, Block, BlockType } from "../token";

export const orderedListRule: BlockRule = {
  exec: (line, tokens): Block | null => {
    const matches = /^(\s*)(\d+)\.\s+(.*)\s*$/.exec(line)
    if (!matches || matches.length < 4) {
      return null
    }

    const item = listItem({
      content: matches[3],
    })

    let token = tokens.pop()
    // if the last token isn't an ol, create the ol before adding
    // the li
   if (!token || token.type !== BlockType.OrderedList) {
      if (token) {
        // push back whatever we just popped
        tokens.push(token)
      }

      token = orderedList({
        children: [],
      })
    }

    token.children.push(item)
    return token
  }
}