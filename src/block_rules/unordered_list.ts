import { BlockRule } from "../rules";
import { listItem, Block, BlockType, unorderedList } from "../token";

export const unorderedListRule: BlockRule = {
  exec: (line, tokens): Block | null => {
    const matches = /^(\s*)\*\s+(.*)\s*$/.exec(line)
    if (!matches || matches.length < 3) {
      return null
    }

    const item = listItem({
      content: matches[2],
    })

    let token = tokens.pop()
    // if the last token isn't a ul, create the ul before adding
    // the li
   if (!token || token.type !== BlockType.UnorderedList) {
      if (token) {
        // push back whatever we just popped
        tokens.push(token)
      }

      token = unorderedList({
        children: [],
      })
    }

    token.children.push(item)
    return token
  }
}