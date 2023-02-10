import { BlockRule } from "../rules";
import { listItemToken, Token, TokenType, unorderedListToken } from "../token";

export const unorderedList: BlockRule = {
  exec: (line, tokens): Token | null => {
    const matches = /^(\s*)\*\s+(.*)\s*$/.exec(line)
    if (!matches || matches.length < 3) {
      return null
    }

    const item = listItemToken({
      content: matches[2],
    })

    let token = tokens.pop()
    // if the last token isn't a ul, create the ul before adding
    // the li
   if (!token || token.type !== TokenType.UnorderedList) {
      if (token) {
        // push back whatever we just popped
        tokens.push(token)
      }

      token = unorderedListToken({
        children: [],
      })
    }

    token.children.push(item)
    return token
  }
}